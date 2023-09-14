import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


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
  changeTask: (todoListID: string, taskID: string, value: string) => void
  changeTodoList: (todoListID: string, value: string) => void
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
  const changeTodoList = (title: string) => {
    props.changeTodoList(props.todoListId, title)
  }
  const changeTaskHandler = (taskId: string, value: string) => {
    props.changeTask(props.todoListId, taskId, value)
  }

  return <div>
    <h3>
      <IconButton aria-label="delete">
        <DeleteIcon onClick={onClickRemoveTodoListHandler}/>
      </IconButton>
      <EditableSpan title={props.title} callback={changeTodoList}/>
    </h3>
    <div>
      <AddItemForm callback={addTaskHandler}/>
    </div>
    <ul>
      {
        props.tasks.map(t => {

          return (
            <li key={t.id} className={t.isDone ? styles.isDone : ''}>
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => {
                  props.removeTask(props.todoListId, t.id)
                }}/>
              </IconButton>
              <Checkbox checked={t.isDone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIsDoneHandler(e.currentTarget.checked, t.id)}
              />
              <EditableSpan title={t.title} callback={(title) => changeTaskHandler(t.id, title)}/>
            </li>
          )
        })
      }
    </ul>
    <div>
      <Button variant={buttonName === 'all' ? "contained" : 'outlined'} color="primary"
              onClick={() => tsarHandler('all')}> All </Button>
      <Button variant={buttonName === 'active' ? "contained" : 'outlined'} color="primary"
              onClick={() => tsarHandler('active')}> Active </Button>
      <Button variant={buttonName === 'completed' ? "contained" : 'outlined'} color="primary"
              onClick={() => tsarHandler('completed')}> Completed </Button>
    </div>
  </div>
}
