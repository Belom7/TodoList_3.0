import React from 'react';
import {TasksType} from "./App";

type PropsType = {
  name:string,
  tasks: TasksType
}

export const Todolist = (props:PropsType) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(el=>{
          return(
            <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
          )
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
