import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert('Please enter a task title!');
    
    onAddTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
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
  );
}

export default TaskForm;