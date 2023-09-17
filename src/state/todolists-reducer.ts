import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id != action.payload.todolistId)
    case 'ADD-TODOLIST':
      return [...state, {id: action.payload.todoListId, title: action.payload.title, filter: "all"}]
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
    }
    default:
      return state
  }
}

export const RemoveTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistId
    }
  } as const
}
export const AddTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
      todoListId: v1()
    }
  } as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
  debugger
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      title,
      todolistId
    }
  } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      filter: filter,
      todolistId
    }
  } as const
}
