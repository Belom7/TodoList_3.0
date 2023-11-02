import {appActions, RequestStatusType,} from 'app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoListsAPI, TodolistType} from "features/TodolistsList/todoListsApi";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThync";

const slice = createSlice({
    name: 'todoLists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ todoListId: string, filter: FilterValuesType }>) => {
            // const index = state.findIndex((todo) => todo.id === action.payload.id)
            // if (index !== -1) state[index].filter = action.payload.filter
            const todoList = state.find((todo) => todo.id === action.payload.todoListId)
            if (todoList) todoList.filter = action.payload.filter
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            // const index = state.findIndex((todo) => todo.id === action.payload.id)
            // if (index !== -1) state[index].entityStatus = action.payload.entityStatus
            const todoList = state.find((todo) => todo.id === action.payload.id)
            if (todoList) todoList.entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                state = action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
                return state
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.todoListId)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitle.fulfilled,(state, action) => {
                const todoList = state.find((todo) => todo.id === action.payload.todoListId)
                if (todoList) todoList.title = action.payload.title
            })
    }
})


// thunks
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>('todoLists/fetchTodoLists', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todoListsAPI.getTodolists()
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
})
const removeTodolist = createAppAsyncThunk<{ todoListId: string }, { todoListId: string }>('todoLists/removeTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todoListsAPI.deleteTodolist(arg.todoListId)
        if (res.data.resultCode === 0) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
})
const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>('todoLists/addTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todoListsAPI.createTodolist(arg.title)
        if (res.data.resultCode === 0) {
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
})
const changeTodolistTitle = createAppAsyncThunk<{ todoListId: string, title: string }, { todoListId: string, title: string }>('todoLists/changeTodolistTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todoListsAPI.updateTodolist(arg.todoListId, arg.title)
        if (res.data.resultCode === 0) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todoListsThunks = {fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}