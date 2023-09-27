import {TasksStateType} from '../App';
import {AddTodolistActionType, GetTodoListsACActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {tasksAPI} from "../api/tasks-api";
import {AppRootStateType} from "./store";
import {errorAC, ErrorACType, preloaderStatusAC} from "./app-reducer";
import {AxiosError} from "axios";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type GetTaskACType = ReturnType<typeof getTaskAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | GetTodoListsACActionType
  | GetTaskACType
  | ErrorACType

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "GET-TODO_LISTS": {
      const copyState = {...state}
      action.payload.todoList.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case "GET_TASKS": {
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks
      }
    }
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.payload.todolistId];
      stateCopy[action.payload.todolistId] = tasks.filter(t => t.id !== action.payload.taskId);
      return stateCopy;
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]
      }
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = todolistTasks
        .map(t => t.id === action.payload.taskId ? {...t, status: action.payload.status} : t);
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.payload.todolistId];
      // найдём нужную таску:
      state[action.payload.todolistId] = todolistTasks
        .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t);
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.payload.todoListId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.payload.todolistId];
      return copyState;
    }
    default:
      return state;
  }
}


export const getTaskAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: 'GET_TASKS',
    payload: {
      todolistId,
      tasks
    }
  } as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todolistId,
      taskId,
    }
  } as const
}
export const addTaskAC = (task: TaskType, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      task,
      todolistId,
    }
  } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      title,
      todolistId,
      taskId
    }
  } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      status,
      todolistId,
      taskId
    }
  } as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  tasksAPI.getTasks(todolistId)
    .then(res => {
      dispatch(getTaskAC(todolistId, res.data.items))
    })
    .finally(() => {
      dispatch(preloaderStatusAC('succeeded'))
    })
}
export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  tasksAPI.deleteTask(todolistId, taskId)
    .then(() => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
    .finally(() => {
      dispatch(preloaderStatusAC('succeeded'))
    })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  tasksAPI.createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item, todolistId))
      } else {
        const messagesError = res.data.messages[0]
        if (messagesError) {
          dispatch(errorAC(messagesError))
        }
      }
    })
    .catch((e: AxiosError<ErrorACType>) => {
      dispatch(errorAC(e.message))
    })
    .finally(() => {
      dispatch(preloaderStatusAC('succeeded'))
    })
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[todolistId].find(el => el.id === taskId)
  if (task) {
    const model: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    dispatch(preloaderStatusAC('loading'))
    tasksAPI.updateTask(todolistId, taskId, model)
      .then(() => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
      })
      .finally(() => {
        dispatch(preloaderStatusAC('succeeded'))
      })
  }
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[todolistId].find(el => el.id === taskId)
  if (task) {
    const model: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    dispatch(preloaderStatusAC('loading'))
    tasksAPI.updateTask(todolistId, taskId, model)
      .then(() => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
      })
      .finally(() => {
        dispatch(preloaderStatusAC('succeeded'))
      })
  }
}
