import { useState, useEffect } from 'react';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

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

  const addTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText }),
    });
    if (response.ok) {
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskText('');
    }
  };

  const toggleCompletion = async (id) => {
    const task = tasks.find(task => task._id === id);
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    if (response.ok) {
      setTasks(tasks.map((task) => task._id === id ? { ...task, completed: !task.completed } : task));
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText }),
    });
    if (response.ok) {
      setTasks(tasks.map((task) => (task._id === id ? { ...task, text: editText } : task)));
      setEditingId(null);
      setEditText('');
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
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
            {editingId === task._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(task._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => toggleCompletion(task._id)}>
                  {task.completed ? 'Marquer comme non complétée' : 'Marquer comme complétée'}
                </button>
                <button onClick={() => startEditing(task._id, task.text)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
