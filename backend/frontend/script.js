const API_URL = 'http://localhost:4000/api/workouts';

// READ - Haal alle workouts op
const fetchWorkouts = async () => {
  try {
    const response = await fetch(API_URL);
    const workouts = await response.json();
    renderWorkouts(workouts);
  } catch (error) {
    console.error('Fout bij ophalen:', error);
    document.getElementById('workout-list').innerHTML = '<p>Fout bij het laden van workouts</p>';
  }
};

// Toon workouts in de HTML
const renderWorkouts = (workouts) => {
  const list = document.getElementById('workout-list');
  list.innerHTML = '';

  if (workouts.length === 0) {
    list.innerHTML = '<p>Geen workouts gevonden</p>';
    return;
  }

  workouts.forEach(workout => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${workout.title}</h3>
      <p><strong>Reps:</strong> ${workout.reps}</p>
      <p><strong>Load:</strong> ${workout.load} kg</p>
      <p><strong>Aangemaakt:</strong> ${new Date(workout.createdAt).toLocaleDateString('nl-NL')}</p>
      <button class="update-btn" onclick="showUpdateForm('${workout._id}', '${workout.title}', ${workout.reps}, ${workout.load})">
        Aanpassen
      </button>
      <button class="delete-btn" onclick="deleteWorkout('${workout._id}')">
        Verwijderen
      </button>
    `;
    list.appendChild(div);
  });
};

// CREATE - Workout toevoegen
document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const workout = {
    title: document.getElementById('title').value,
    reps: Number(document.getElementById('reps').value),
    load: Number(document.getElementById('load').value)
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout)
    });

    if (response.ok) {
      document.getElementById('add-form').reset();
      fetchWorkouts();
      alert('Workout succesvol toegevoegd!');
    } else {
      alert('Fout bij het toevoegen van workout');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error bij verzenden');
  }
});

// UPDATE - Formulier tonen met huidige waarden
const showUpdateForm = (id, title, reps, load) => {
  document.getElementById('update-id').value = id;
  document.getElementById('update-title').value = title;
  document.getElementById('update-reps').value = reps;
  document.getElementById('update-load').value = load;
  document.getElementById('update-form-container').style.display = 'block';
  
  // Scroll naar het formulier
  document.getElementById('update-form-container').scrollIntoView({ behavior: 'smooth' });
};

const hideUpdateForm = () => {
  document.getElementById('update-form-container').style.display = 'none';
};

document.getElementById('update-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('update-id').value;
  const updatedWorkout = {
    title: document.getElementById('update-title').value,
    reps: Number(document.getElementById('update-reps').value),
    load: Number(document.getElementById('update-load').value)
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWorkout)
    });

    if (response.ok) {
      hideUpdateForm();
      fetchWorkouts();
      alert('Workout succesvol bijgewerkt!');
    } else {
      alert('Fout bij het bijwerken van workout');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error bij verzenden');
  }
});

// DELETE - Workout verwijderen
const deleteWorkout = async (id) => {
  if (!confirm('Weet je zeker dat je deze workout wilt verwijderen?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchWorkouts();
      alert('Workout succesvol verwijderd!');
    } else {
      alert('Fout bij het verwijderen van workout');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error bij verzenden');
  }
};

// Laad workouts zodra de pagina klaar is
document.addEventListener('DOMContentLoaded', fetchWorkouts);
