import React, {useState} from 'react';
import './App.css';
import {FilterTaskType, Todolist} from "./Todolist";

export type TasksType = Task[]

type TaskType = {
  // id: number,
  title: string,
  isDone: boolean
}

interface Task extends TaskType {
  id: number,
}

function App() {

  const name1 = 'What to learn'

  const [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false}
  ])

  const removeTask = (id: number) => {
    setTasks(tasks.filter(e => e.id !== id))
  }





  return (
    <div className="App">
      <Todolist name={name1} tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
