import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils'
import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/app-reducer";
import {todoListsThunks} from "features/TodolistsList/todolists-reducer";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThync";
import {
    ArgAddTask,
    ArgRemoveTask,
    ArgUpdateTask,
    TaskType,
    todoListsAPI,
    UpdateTaskModelType
} from "features/TodolistsList/todoListsApi";
import {TaskPriorities, TaskStatuses} from "common/enum/enum";

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasksForTodoLists = state[action.payload.task.todoListId]
                tasksForTodoLists.unshift(action.payload.task)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasksForTodoLists = state[action.payload.todoListId]
                const index = tasksForTodoLists.findIndex(task => task.id === action.payload.taskId)
                if (index !== -1) {
                    tasksForTodoLists[index] = {...tasksForTodoLists[index], ...action.payload.domainModel}
                }
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasksForTodoLists = state[action.payload.todoListId]
                const index = tasksForTodoLists.findIndex((todo) => todo.id === action.payload.taskId)
                if (index !== -1) state[action.payload.todoListId].splice(index, 1)
            })
            .addCase(todoListsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todoListsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todoListId]
            })
            .addCase(todoListsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(todolist => state[todolist.id] = [])
            })
    }
})

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todoListId: string }, string>('tasks/fetchTasks', async (todoListId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todoListsAPI.getTasks(todoListId)
        // dispatch(tasksActions.setTasks({tasks: res.data.items, todolistId}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {tasks: res.data.items, todoListId: todoListId}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
const addTask = createAppAsyncThunk<{ task: TaskType }, ArgAddTask>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todoListsAPI.createTask(arg.todoListId, arg.title)

        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            return {task}
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
const removeTask = createAppAsyncThunk<ArgRemoveTask, ArgRemoveTask>('tasks/removeTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todoListsAPI.deleteTask(arg.todoListId, arg.taskId)

        if (res.data.resultCode === 0) {
            return {todoListId: arg.todoListId, taskId: arg.taskId}
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
const updateTask = createAppAsyncThunk<ArgUpdateTask, ArgUpdateTask>('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const state = getState()
        const task = state.tasks[arg.todoListId].find(t => t.id === arg.taskId)

        if (!task) {
            console.warn('task not found in the state')
            return rejectWithValue(null)
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...arg.domainModel
        }

        const res = await todoListsAPI.updateTask(arg.todoListId, arg.taskId, apiModel)
        if (res.data.resultCode === 0) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasks, addTask, updateTask, removeTask}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
