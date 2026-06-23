import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a task title!');
    
    onAddTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="input-field title-input"
          />
        </div>
        <div className="form-group">
          <textarea 
            placeholder="Add description or notes (Optional)..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="input-field desc-input"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </div>
        <button type="submit" className="submit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add New Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;