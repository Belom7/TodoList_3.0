import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css';
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  todoListId: string
  filter: FilterValuesType,
  tasks: Array<TaskType>

  removeTask: (todoListID: string, taskId: string) => void
  changeFilter: (todoListID: string, value: FilterValuesType) => void
  addTask: (todoListID: string, title: string) => void
  changeIsDone: (todoListID: string, isDone: boolean, id: string) => void
  removeTodolist: (todoListID: string) => void
}

export function Todolist(props: PropsType) {

  const [buttonName, setButtonName] = useState('all')

  const tsarHandler = (value: FilterValuesType) => {
    props.changeFilter(props.todoListId, value)
    setButtonName(value)
  }
  const onChangeIsDoneHandler = (isDone: boolean, id: string) => {
    props.changeIsDone(props.todoListId, isDone, id)
  }
  const onClickRemoveTodoListHandler = () => {
    props.removeTodolist(props.todoListId)
  }
  const addTaskHandler = (title: string) => {
    props.addTask(props.todoListId, title)
  }

  return <div>
    <h3>
      <button onClick={onClickRemoveTodoListHandler}>X</button>
      {props.title}
    </h3>
    <div>
      <AddItemForm callback={addTaskHandler}/>
    </div>
    <ul>
      {
        props.tasks.map(t => <li key={t.id} className={t.isDone ? styles.isDone : ''}>
          <button onClick={() => {
            props.removeTask(props.todoListId, t.id)
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
      <button className={buttonName === 'all' ? styles.activeFilter : ''} onClick={() => tsarHandler('all')}>All
      </button>
      <button className={buttonName === 'active' ? styles.activeFilter : ''}
              onClick={() => tsarHandler('active')}>Active
      </button>
      <button className={buttonName === 'completed' ? styles.activeFilter : ''}
              onClick={() => tsarHandler('completed')}>Completed
      </button>
    </div>
  </div>
}
