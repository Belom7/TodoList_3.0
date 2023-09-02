import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

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
    const name2 = 'What to learn 2'

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]

    return (
        <div className="App">
            <Todolist name={name1} tasks={tasks1}/>
            <Todolist name={name2} tasks={tasks2}/>
        </div>
    );
}

export default App;
