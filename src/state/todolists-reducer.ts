import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type GetTodoListsACActionType = ReturnType<typeof getTodoListsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | GetTodoListsACActionType

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.todolistId)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.payload.todoListId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.payload.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.payload.title;
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.payload.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.payload.filter;
      }
      return [...state]
    }
    case "GET-TODO_LISTS": {
      return action.payload.todoList.map((tl) => ({...tl, filter: 'all'}))
    }
    default:
      return state;
  }
}

export const getTodoListsAC = (todoList: TodolistType[]) => {
  return {
    type: 'GET-TODO_LISTS',
    payload: {
      todoList
    }
  } as const
}
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistId
    }
  } as const
}
export const addTodolistAC = (title: string,id:string ) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
      todoListId: id
    }
  } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id,
      title
    }
  } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id,
      filter
    }
  } as const
}


export const getTodoListTC = () => (dispatch: Dispatch) => {
  todolistsAPI.getTodolists()
    .then(res => {
      dispatch(getTodoListsAC(res.data))
    })
}
export const addTodolistTC = (title:string) => (dispatch: Dispatch) =>{
  todolistsAPI.createTodolist(title)
    .then((res)=>{
       dispatch(addTodolistAC(title,res.data.data.item.id))
    })
}
export const removeTodoListTC = (todoListId:string) => (dispatch:Dispatch) => {
  todolistsAPI.deleteTodolist(todoListId)
    .then(()=>{
      dispatch(removeTodolistAC(todoListId))
    })
}
export const changeTodolistTitleTC = (todoListId:string, title:string) => (dispatch:Dispatch) => {
  todolistsAPI.updateTodolist(todoListId,title)
    .then(()=>{
      dispatch(changeTodolistTitleAC(todoListId,title))
    })
}

