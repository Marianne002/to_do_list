import { useState, useEffect } from 'react';

function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [tasks]);

  const addTask = async (text) => {
    if (text.trim() === '') {
      return; // vérifie que le texte n'est pas vide
    }
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    });
  };

  const toggleTaskCompletion = async (id, completed) => {
    const response = await fetch(`/api/tasks?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: completed }),
    });
    if (response.ok) {
      setTasks(tasks.map(task => (task._id === id ? { ...task, completed: !completed } : task)));
    }
  };

  const editTask = async (id, text) => {
    if (text.trim() === '') {
      return; // vérifie que le texte n'est pas vide encore
    }
    const response = await fetch(`/api/tasks?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    });
    if (response.ok) {
      setTasks(tasks.map(task => (task._id === id ? { ...task, text: text } : task)));
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`api/tasks?id=${id}`, {
        method: 'DELETE',
      });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
          setTasks(tasks.filter(task => task._id !== id));
      } catch (error) {
          console.error('Erreur lors de la suppression de la tâche', error);
    }
};


  return (
    <div>
    <h1>Ma Liste de Tâches</h1>
    <ul>
      <button id='new' onClick={() => addTask(prompt("Nouvelle tâche"))}>Ajouter une tâche</button>
      <hr />
      {tasks.map((task) => (
        <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>
          {task.text}
          <div>
            <button onClick={() => toggleTaskCompletion(task._id)}>
            {task.completed ? 'Marquer comme non complétée' : 'Marquer comme complétée'}
            </button>
            <button id='edit' onClick={() => editTask(task._id, prompt("Modifier la tâche", task.text))}>Modifier</button>
            <button id='delete' onClick={() => deleteTask(task._id)}>Supprimer</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default HomePage;
