import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Task} from './Task'
import {TaskStatuses} from './api/todolists-api'
import {changeTodolistFilterAC, FilterValuesType, TodolistDomainType} from './state/todolists-reducer'
import {useAppDispatch, useAppSelector} from "./state/store";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, getTasksTC, removeTasksTC} from "./state/tasks-reducer";
import {TasksStateType} from "./App";

type PropsType = {
  todoList: TodolistDomainType

  changeFilter: (value: FilterValuesType, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
}

export const Todolist = React.memo(function (props: PropsType) {

  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasksTC(props.todoList.id))
  }, [])

  const removeTask = useCallback((taskId: string) => {
    dispatch(removeTasksTC(props.todoList.id, taskId))
  }, []);
  const addTask = useCallback((title: string) => {
    dispatch(addTaskTC(props.todoList.id, title))
  }, []);
  const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleTC(props.todoList.id, taskId, newTitle))
  }, []);
  const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
    dispatch(changeTaskStatusTC(props.todoList.id, taskId, status))
  }, []);
  const changeFilter = useCallback((value: FilterValuesType) => {
    const action = changeTodolistFilterAC(props.todoList.id, value);
    dispatch(action);
  }, []);


  const onClickRemoveTodolistHandler = useCallback(() => {
    props.removeTodolist(props.todoList.id)
  }, [props.removeTodolist, props.todoList.id])
  const onChangeTodolistTitleHandler = useCallback((title: string) => {
    props.changeTodolistTitle(props.todoList.id, title)
  }, [props.todoList.id, props.changeTodolistTitle])

  const onClickFilterHandler = useCallback((value: FilterValuesType) => changeFilter(value), [changeFilter])

  let tasksForTodolist = tasks[props.todoList.id]

  if (props.todoList.filter === 'active') {
    tasksForTodolist = tasks[props.todoList.id].filter(t => t.status === TaskStatuses.New)
  }
  if (props.todoList.filter === 'completed') {
    tasksForTodolist = tasks[props.todoList.id].filter(t => t.status === TaskStatuses.Completed)
  }

  return <div>
    <h3><EditableSpan value={props.todoList.title} onChange={onChangeTodolistTitleHandler}/>
      <IconButton onClick={onClickRemoveTodolistHandler} disabled={props.todoList.entityStatus === 'loading'}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask} entityStatus={props.todoList.entityStatus}/>
    <div>
      {
        tasksForTodolist.map(t => {
          return <Task key={t.id}
                       task={t}
                       removeTask={removeTask}
                       changeTaskTitle={changeTaskTitle}
                       changeTaskStatus={changeTaskStatus}
          />
        })
      }
    </div>
    <div style={{paddingTop: '10px'}}>
      <Button variant={props.todoList.filter === 'all' ? 'outlined' : 'text'}
              onClick={() => onClickFilterHandler('all')}
              color={'inherit'}
      >All
      </Button>
      <Button variant={props.todoList.filter === 'active' ? 'outlined' : 'text'}
              onClick={() => onClickFilterHandler('active')}
              color={'primary'}>Active
      </Button>
      <Button variant={props.todoList.filter === 'completed' ? 'outlined' : 'text'}
              onClick={() => onClickFilterHandler('completed')}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>
})


