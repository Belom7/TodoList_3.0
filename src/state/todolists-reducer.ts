import {FilterValuesType, TasksStateType, TodolistType} from '../App';
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
      return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state];
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
  return {type: 'ADD-TODOLIST', title: title, todoListId: v1()} as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
  return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const
}
