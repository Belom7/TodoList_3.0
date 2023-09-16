import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {TodolistType} from "./AppWitchRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddTaskAC, changeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolist: TodolistType
}

export function TodolistWitchRedux({todolist}: PropsType) {
  const {id, title, filter} = todolist

  let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
  const dispatch = useDispatch()

  const addTask = (title: string) => dispatch(AddTaskAC(id, title))

  const removeTodolist = () => dispatch(RemoveTodolistAC(id))
  const changeTodolistTitle = (title: string) => dispatch(ChangeTodolistTitleAC(id, title))

  const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, 'all'))
  const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, 'active'))
  const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, 'completed'))

  if (filter === "active") {
    tasks = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasks = tasks.filter(t => t.isDone);
  }

  return <div>
    <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        tasks.map(t => {
          const onClickHandler = () => dispatch(RemoveTaskAC(id, t.id))
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(id, t.id, newIsDoneValue))
          }
          const onTitleChangeHandler = (newValue: string) => dispatch(ChangeTaskTitleAC(id, t.id, newValue))


          return <div key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
              checked={t.isDone}
              color="primary"
              onChange={onChangeHandler}
            />

            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
              <Delete/>
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button variant={filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'inherit'}
      >All
      </Button>
      <Button variant={filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>
}


