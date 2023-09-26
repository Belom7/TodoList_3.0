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
import {useAppDispatch, useAppSelector} from './state/store';
import {TaskType} from './api/todolists-api'
import LinearProgress from "@mui/material/LinearProgress";
import {CustomizedSnackbars} from "./CustomizedSnackbars";


export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  useEffect(() => {
    dispatch(getTodoListTC())
  }, [])

  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch();

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch]);
  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodoListTC(id));
  }, []);
  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleTC(id, title))
  }, []);



  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  }, []);

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
      {status === 'loading' && <LinearProgress/>}
      <CustomizedSnackbars/>

      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {

              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    todoList={tl}
                    changeFilter={changeFilter}
                    // filter={tl.filter}
                    removeTodolist={removeTodolist}
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
