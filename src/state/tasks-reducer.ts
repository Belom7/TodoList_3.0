import {TasksStateType} from '../App';
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type removeTaskACType = ReturnType<typeof RemoveTaskAC>
type addTaskACType = ReturnType<typeof AddTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>


type ActionsType =
  | removeTaskACType
  | addTaskACType
  | changeTaskStatusACType
  | changeTaskTitleACType
  | AddTodolistActionType
  | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
      }
    case "ADD-TASK": {
      const newTaskId = v1()
      const newTask: TaskType = {id: newTaskId, title: action.payload.title, isDone: false}
      return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
          ...task,
          isDone: action.payload.value
        } : task)
      }
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
          ...task,
          title: action.payload.title
        } : task)
      }
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todoListId]: []
      }
    }
    case "REMOVE-TODOLIST": {
      // let copyState = {...state}
      // delete copyState[action.payload.todolistId]
      // return copyState
      const {[action.payload.todolistId]: [], ...rest} = state
      return rest
    }

    default:
      return state
  }
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todolistId,
      taskId,
    }
  } as const
}
export const AddTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todolistId,
      title,
    }
  } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, value: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todolistId,
      taskId,
      value,
    }
  } as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      todolistId,
      taskId,
      title
    }
  } as const
}

