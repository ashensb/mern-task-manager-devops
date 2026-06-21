import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  // API base URL ilastic ip address of the backend server
  const API_URL = '/api/tasks';

  // 1. FETCH ALL TASKS
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

  // 2. ADD NEW TASK
  const handleAddTask = async (title, description) => {
    try {
      await axios.post(API_URL, { title, description });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 3. DELETE TASK
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 4. TOGGLE COMPLETE STATUS
  const handleToggleComplete = async (task) => {
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
        {/* Component architecture */}
        <TaskForm onAddTask={handleAddTask} />

        <section className="tasks-section">
          <h2>Current Tasks ({tasks.length})</h2>
          <div className="tasks-list">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks available. Add your first task above!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onToggleComplete={handleToggleComplete} 
                  onDeleteTask={handleDeleteTask} 
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;