import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from 'app/store'
import {
    FilterValuesType,
    TodolistDomainType, todolistsActions, todoListsThunks
} from './todolists-reducer'
import {TasksStateType, tasksThunks} from './tasks-reducer'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'common/components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {useAppDispatch} from 'common/hooks/useAppDispatch';
import {TaskStatuses} from "common/enum/enum";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(todoListsThunks.fetchTodolists())
    }, [])

    const removeTask = useCallback(function (taskId: string, todoListId: string) {
        dispatch(tasksThunks.removeTask({taskId, todoListId}))
    }, [])
    const addTask = useCallback(function (title: string, todoListId: string) {
        dispatch(tasksThunks.addTask({title, todoListId}))
    }, [])
    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todoListId: string) {
        dispatch(tasksThunks.updateTask({taskId, domainModel: {status}, todoListId}))
    }, [])
    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todoListId: string) {
        const thunk = tasksThunks.updateTask({taskId, domainModel: {title: newTitle}, todoListId})
        dispatch(thunk)
    }, [])
    const changeFilter = useCallback(function (value: FilterValuesType, todoListId: string) {
            dispatch(todolistsActions.changeTodolistFilter({todoListId, filter: value}))
        }, [])
    const removeTodolist = useCallback(function (todoListId: string) {
        dispatch(todoListsThunks.removeTodolist({todoListId}))
    }, [])
    const changeTodolistTitle = useCallback(function (todoListId: string, title: string) {
        dispatch(todoListsThunks.changeTodolistTitle({todoListId, title}))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(todoListsThunks.addTodolist({title}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists?.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
