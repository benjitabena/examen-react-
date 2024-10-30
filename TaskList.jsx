import Task from './Task';

const TaskList = ({ tasks, onDelete, onComplete, onEdit }) => {
  return (
    <div>
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onComplete={onComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
