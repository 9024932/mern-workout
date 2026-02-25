// Importeer Express
import express from "express";

// Maak Express app
const app = express();

// Haal PORT uit .env (of gebruik 4000)
const PORT = process.env.PORT || 4000;

// Middleware: lees JSON
app.use(express.json());

// Test route - reageer op GET /
app.get("/workout", (req, res) => {
  res.json({
    message: "Mijn eerste backend!",
    success: true,
  });
});

app.get("/api/workouts", (req, res) => {
  res.json({
    message: "Alle workouts",
    data: [], // Later echte data
  });
});

app.get("/api/workouts/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Workout ${id}`,
    id: id,
  });
});

app.post("/api/workouts", (req, res) => {
  const { title, reps, load } = req.body;

  res.json({
    message: "Workout aangemaakt",
    data: { title, reps, load },
  });
});

app.patch("/api/workouts/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Workout ${id} aangepast`,
    updates: req.body,
  });
});

app.delete("/api/workouts/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Workout ${id} verwijderd`,
  });
});



// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
