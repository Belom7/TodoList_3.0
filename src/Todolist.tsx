import React, {useState} from 'react';
import {TasksType} from "./App";

type PropsType = {
  name: string,
  tasks: TasksType
  removeTask: (id: number) => void
  // filterTasks: (taskName:FilterTaskType) => void
}

export type FilterTaskType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: PropsType) => {

  let [filterTask, setFilterTask] = useState<FilterTaskType>('All')

  const filterTasks = (taskName: FilterTaskType) => {
    setFilterTask(taskName)
  }

  const filterFoo = () => {

    let filteredTasks = props.tasks

    switch (filterTask) {
      case 'Active':
        filteredTasks = props.tasks.filter(e => e.isDone)
        break;
      case 'Completed':
        filteredTasks = props.tasks.filter(e => !e.isDone)
        break;
      default:
        filteredTasks = props.tasks
    }

    return filteredTasks

    // let filteredTasks = props.tasks
    //
    // if (filterTask === 'Active') {
    //   filteredTasks = props.tasks.filter(e => e.isDone)
    // }
    // if (filterTask === 'Completed') {
    //   filteredTasks = props.tasks.filter(e => !e.isDone)
    // }
    // return filteredTasks
  }


  return (
    <div>
      <h3>{props.name}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {filterFoo().map(el => {
          return (
            <li key={el.id}>
              <button onClick={() => props.removeTask(el.id)}>X</button>
              <input type="checkbox" checked={el.isDone}/>
              <span>{el.title}</span>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={() => filterTasks('All')}>All</button>
        <button onClick={() => filterTasks('Active')}>Active</button>
        <button onClick={() => filterTasks('Completed')}>Completed</button>
      </div>
    </div>
  );
};
