import TaskControls from './TaskControls';
const Task = ({ task, onDelete, onComplete, onEdit }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <TaskControls 
        task={task} 
        onDelete={onDelete} 
        onComplete={onComplete}
        onEdit={onEdit}
      />
    </div>
  );
};
export default Task;

