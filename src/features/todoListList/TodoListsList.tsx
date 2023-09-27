import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "../../Todolist";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValuesType, getTodoListTC,
  removeTodoListTC,
  TodolistDomainType
} from "../../state/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {AddItemForm} from "../../AddItemForm";
import {Navigate} from "react-router-dom";


export const TodoListsList = () => {

  useEffect(() => {
    if(!isLoggedIn) return
    dispatch(getTodoListTC())
  }, [])


  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodoListTC(id));
  }, []);
  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitleTC(id, title))
  }, []);

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch]);


  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  }, []);

  if(!isLoggedIn) {
    return  <Navigate to={'/login'}/>
  }

  return (
    <div>
      <Grid container style={{padding : '20px'}}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>
      <Grid container spacing={3}>
        {
          todolists.map(tl => {
            return (
              <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    todoList={tl}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>)
          })
        }
      </Grid>
    </div>
  );
};
