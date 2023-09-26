import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {errorAC, ErrorACType, preloaderStatusAC, PreloaderStatusACType, RequestStatusType} from "./app-reducer";
import {AxiosError} from "axios";

enum RESULT_CODE {
  SUCCESS,
  FAILED
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type GetTodoListsACActionType = ReturnType<typeof getTodoListsAC>
export type SetEntityStatusActionType = ReturnType<typeof setEntityStatusAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | GetTodoListsACActionType
  | PreloaderStatusACType
  | SetEntityStatusActionType

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType,
  entityStatus: RequestStatusType
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
        order: 0,
        entityStatus: 'idle'
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
      return action.payload.todoList.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
    }
    case "SET-ENTITY-STATUS": {
      return state.map(el => el.id === action.payload.todoListId ? {...el, entityStatus: action.payload.status} : el)
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
export const addTodolistAC = (title: string, id: string) => {
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
export const setEntityStatusAC = (status: RequestStatusType, todoListId: string) => {
  return {
    type: 'SET-ENTITY-STATUS',
    payload: {
      status,
      todoListId
    }
  } as const
}


export const getTodoListTC = () => (dispatch: Dispatch) => {
  todolistsAPI.getTodolists()
    .then(res => {
      dispatch(getTodoListsAC(res.data))
      dispatch(preloaderStatusAC('succeeded'))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  todolistsAPI.createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(addTodolistAC(title, res.data.data.item.id))
        // dispatch(setEntityStatusAC('loading', res.data.data.item.id))
      } else {
        const messageError = res.data.messages[0]
        if (messageError) {
          dispatch(errorAC(messageError))
        }
      }
    })
    .catch((e: AxiosError<ErrorACType>) => {
      dispatch(errorAC(e.message))
    })
    .finally(() => {
        dispatch(preloaderStatusAC('succeeded'))
        // dispatch(setEntityStatusAC('loading', ))
      }
    )
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  dispatch(setEntityStatusAC('loading', todoListId))
  todolistsAPI.deleteTodolist(todoListId)
    .then(() => {
      dispatch(removeTodolistAC(todoListId))
    })
    .finally(() => {
      dispatch(preloaderStatusAC('succeeded'))
      dispatch(setEntityStatusAC('succeeded', todoListId))
    })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  todolistsAPI.updateTodolist(todoListId, title)
    .then(() => {
      dispatch(changeTodolistTitleAC(todoListId, title))
    })
    .finally(() => {
      dispatch(preloaderStatusAC('succeeded'))
    })
}

