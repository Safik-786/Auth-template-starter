import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Adjust this to your React app URL
  credentials: true, // Important to allow sending cookies back and forth
}));
app.use(express.json());
app.use(cookieParser()); // To parse cookies from incoming requests

// Routes
app.use('/api/auth', authRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
