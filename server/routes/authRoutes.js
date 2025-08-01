// routes/authRoutes.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route is working ✅");
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Optional: Validate email/password, check if user exists, save to DB, etc.

  res.json({
    message: "Signup successful!",
    email,
  });
});

export default router;
