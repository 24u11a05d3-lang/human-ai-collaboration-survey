import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main API Route Handler
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`📦 Local File Storage System Initialized.`);
  console.log(`🚀 API Server listening cleanly on port ${PORT}`);
});