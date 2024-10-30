import { useRef } from 'react';

const TaskForm = ({ onAdd }) => {
  const taskInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = taskInputRef.current.value;
    if (title) {
      onAdd(title);
      taskInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={taskInputRef} placeholder="Nueva tarea..." />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default TaskForm;
