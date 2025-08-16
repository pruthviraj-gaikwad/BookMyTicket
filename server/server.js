// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './configs/db.js';
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js"
// import showRouter from './routes/showRoutes.js';
// import { addShow } from './controllers/showController.js';


// const app=express();
// const port=3000;

// await connectDB()

// app.use(express.json())
// app.use(cors())
// app.use(clerkMiddleware())

// app.get('/',(req,res)=>res.send('Sever is Live!'))
// app.use("/api/inngest", serve({ client: inngest, functions}))
// app.use('/api/show',showRouter)
// app.post('/api/add',addShow)

// app.listen(port,()=>console.log(`Server listening at http://localhost:${port}`));
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from './routes/showRoutes.js';
import { addShow } from './controllers/showController.js';

const app = express();
const port = 3000;

// Global middlewares
app.use(express.json());
app.use(cors());

// Public route
app.get('/', (req, res) => res.send('Server is Live!'));

// Inngest webhook route for Clerk events
app.use("/api/inngest", serve({ client: inngest, functions }));

// Protected routes (require Clerk auth)
app.use(clerkMiddleware());
app.use('/api/show', showRouter);
app.post('/api/add', addShow);

// --- Manual test routes using Inngest ---

// CREATE user manually
app.post("/api/test-user", async (req, res) => {
  try {
    const { name, email, image, _id } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email required" });

    await inngest.send({
      name: "clerk/user.created",
      data: { id: _id, name, email, image }
    });

    res.json({ success: true, message: "Create user event sent to Inngest" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user manually
app.put("/api/test-update", async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    if (!id) return res.status(400).json({ error: "User ID is required" });
    if (!updateData || Object.keys(updateData).length === 0)
      return res.status(400).json({ error: "No update data provided" });

    await inngest.send({
      name: "clerk/user.updated",
      data: { id, ...updateData }
    });

    res.json({ success: true, message: "Update user event sent to Inngest" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE user manually
app.delete("/api/test-delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "User ID is required" });

    await inngest.send({
      name: "clerk/user.deleted",
      data: { id }
    });

    res.json({ success: true, message: "Delete user event sent to Inngest" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server after connecting to MongoDB
(async () => {
  await connectDB();
  app.listen(port, () => console.log(`✅ Server listening at http://localhost:${port}`));
})();

