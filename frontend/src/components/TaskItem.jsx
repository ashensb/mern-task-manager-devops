function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description || 'No description provided.'}</p>
      </div>
      <div className="task-actions">
        <button 
          onClick={() => onToggleComplete(task)} 
          className={`action-btn ${task.completed ? 'undo-btn' : 'complete-btn'}`}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button 
          onClick={() => onDeleteTask(task._id)} 
          className="action-btn delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;