import express from 'express';
import cors from 'cors';
import workoutRoutes from './routes/workoutRoutes.js';

const app = express();

// CORS (frontend toegang geven)
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

// JSON middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});