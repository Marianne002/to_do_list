import { useState, useEffect } from 'react';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Charger les tâches au démarrage
  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then(setTasks);
  }, []);

  // Ajouter une nouvelle tâche
  const addTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: taskText }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  // Marquer une tâche comme complétée
  const toggleTaskCompletion = async (id, completed) => {
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id, completed: !completed }),
    });
    setTasks(tasks.map(task => task._id === id ? { ...task, completed: !completed } : task));
  };

  // Supprimer une tâche
  const deleteTask = async (id) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Ajouter une nouvelle tâche"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleTaskCompletion(task._id, task.completed)}>
              {task.completed ? 'Marquer comme non complétée' : 'Marquer comme complétée'}
            </button>
            <button onClick={() => deleteTask(task._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
