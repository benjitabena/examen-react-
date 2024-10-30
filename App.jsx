import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTask = (title) => {
    const newTask = { title, completed: false };
    axios.post('http://localhost:3001/tasks', newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error(error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  const completeTask = (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    axios.put(`http://localhost:3001/tasks/${id}`, updatedTask)
      .then(response => setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      )))
      .catch(error => console.error(error));
  };

  const editTask = (task) => {
    const updatedTitle = prompt('Editar título de la tarea:', task.title);
    if (updatedTitle) {
      const updatedTask = { ...task, title: updatedTitle };
      axios.put(`http://localhost:3001/tasks/${task.id}`, updatedTask)
        .then(response => setTasks(tasks.map(t => 
          t.id === task.id ? response.data : t
        )))
        .catch(error => console.error(error));
    }
  };

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/tasks">Lista de Tareas</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Tareas</h2>} />
        <Route path="/tasks" element={
          <TaskPage 
            tasks={tasks} 
            addTask={addTask} 
            deleteTask={deleteTask} 
            completeTask={completeTask} 
            editTask={editTask}
          />
        } />
      </Routes>
    </Router>
  );
};

const TaskPage = ({ tasks, addTask, deleteTask, completeTask, editTask }) => (
  <div>
    <h1>Lista de Tareas</h1>
    <TaskForm onAdd={addTask} />
    <TaskList 
      tasks={tasks} 
      onDelete={deleteTask} 
      onComplete={completeTask} 
      onEdit={editTask} 
    />
  </div>
);

export default App;
