import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValuesType, getTodoListTC,
  removeTodoListTC,
  TodolistDomainType
} from './state/todolists-reducer'
import {
  addTaskTC,
  changeTaskStatusTC, changeTaskTitleTC,
  removeTasksTC
} from './state/tasks-reducer';
import {useAppDispatch, useAppSelector} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api'


export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  useEffect(() => {
    dispatch(getTodoListTC())
  }, [])

  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const dispatch = useAppDispatch();

  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(removeTasksTC(todolistId, taskId))
  }, []);
  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(todolistId, title))
  }, []);
  const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
    dispatch(changeTaskStatusTC(todolistId, id, status))
  }, []);
  const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleTC(todolistId, id, newTitle))
  }, []);
  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  }, []);
  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodoListTC(id));
  }, []);
  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleTC(id, title))
  }, []);
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];

              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={allTodolistTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
