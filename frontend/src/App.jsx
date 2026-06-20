import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Backend URL
  //const API_URL = 'http://localhost:5000/api/tasks';
  // Backend URL
  const API_URL = 'http://18.213.190.238:5000/api/tasks';

  // 1. SHOWS DATABASE TASKS
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. ADDS NEW TASK TO DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Please enter a task title!');

    try {
      await axios.post(API_URL, { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 3. DELETE TASK
  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 4. TOGGLE COMPLETE STATUS
  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <span role="img" aria-label="task-icon">📝</span>
          My DevOps Task Manager
        </h1>
      </header>
      
      <main>
        {/* Task Add Form */}
        <section>
          <form onSubmit={handleSubmit} className="task-form">
            <input 
              type="text" 
              placeholder="Task Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
            <textarea 
              placeholder="Description (Optional)" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              style={{ minHeight: '100px' }}
            />
            <button type="submit" className="submit-btn">
              Add New Task 
            </button>
          </form>
        </section>

        {/* Current Tasks */}
        <section className="tasks-section">
          <h2>Current Tasks ({tasks.length})</h2>
          <div className="tasks-list">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks available. Add your first task above!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description || 'No description provided.'}</p>
                  </div>
                  <div className="task-actions">
                    <button 
                      onClick={() => toggleComplete(task)} 
                      className={`action-btn ${task.completed ? 'undo-btn' : 'complete-btn'}`}
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button 
                      onClick={() => deleteTask(task._id)} 
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}


export default App;