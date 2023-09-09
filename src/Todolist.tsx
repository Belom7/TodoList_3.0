import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeIsDone: (isDone: boolean, id: string) => void
}

export function Todolist(props: PropsType) {

  const [title, setTitle] = useState('')


  const onChangeHandler = (value: string) => {
    setTitle(value)
  }
  const onClickHandler = () => {
    props.addTask(title)
    setTitle('')
  }
  const onKeyPressHandler = (key: string) => {
    if (key === 'Enter') {
      onClickHandler()
    }
  }
  const onAllClickHandler = () => {
    props.changeFilter("all")
  }
  const onActiveClickHandler = () => {
    props.changeFilter("active")
  }
  const onCompletedClickHandler = () => {
    props.changeFilter("completed")
  }
  const onChangeIsDoneHandler = (isDone: boolean, id: string) => {
    props.changeIsDone(isDone, id)
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input value={title}
             onChange={(e) => onChangeHandler(e.currentTarget.value)}
             onKeyPress={(e) => onKeyPressHandler(e.key)}
      />
      <button onClick={onClickHandler}>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => <li key={t.id}>
          <button onClick={() => {
            props.removeTask(t.id)
          }}>x
          </button>
          <input type="checkbox"
                 checked={t.isDone}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIsDoneHandler(e.currentTarget.checked, t.id)}

          />
          <span>{t.title}</span>
        </li>)
      }
    </ul>
    <div>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={onCompletedClickHandler}>Completed</button>
    </div>
  </div>
}
