import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

dotenv.config();

console.log("Loaded MONGO URI:", process.env.MONGODB_URI);

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const MONGODB_URL = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected to Atlas 🚀"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
