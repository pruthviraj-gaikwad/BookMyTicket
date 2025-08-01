import express from 'express';
const router = express.Router();

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // TODO: Add your signup logic here (e.g., save to DB, verify, etc.)
  res.json({ message: 'User signed up!', email });
});

export default router;