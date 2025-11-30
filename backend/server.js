import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '.backend/src/routes/auth.js';
import userRoutes from '.backend/src/routes/user.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;