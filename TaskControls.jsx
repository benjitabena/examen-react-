const TaskControls = ({ task, onDelete, onComplete, onEdit }) => {
    return (
      <div>
        <button onClick={() => onComplete(task.id)}>Completada</button>
        <button onClick={() => onEdit(task)}>Editar</button>
        <button onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    );
  };
  
  export default TaskControls;
  