import React, {useEffect} from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from './state/store';
import {TaskType} from './api/todolists-api'
import LinearProgress from "@mui/material/LinearProgress";
import {CustomizedSnackbars} from "./CustomizedSnackbars";
import {Route, Routes, Navigate} from "react-router-dom";
import {Login} from "./features/login/Login";
import {TodoListsList} from "./features/todoListList/TodoListsList";
import {authMeTC, logOutTC} from "./features/login/auth-reducer";
import {CircularProgress} from "@mui/material";
import {RequestStatusType} from "./state/app-reducer";


export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.initialized)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  const LogOutHandler = () => {
    dispatch(logOutTC())
  }

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }
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
          {isLoggedIn && <Button color="inherit" onClick={LogOutHandler}>LogOut</Button>}
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress/>}
      <CustomizedSnackbars/>

      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodoListsList/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
          <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
