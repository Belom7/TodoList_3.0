export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'succeeded' as RequestStatusType,
  error: null as null | string,
  initialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return {...state, status: action.preloader.status}
    }
    case "APP/SET-ERROR": {
      return {...state, error: action.preloader.error}
    }
    case "APP/IS-INITIALIZED":{
      return {
        ...state,
        initialized: action.preloader.value
      }
    }
    default:
      return state
  }
}

export const preloaderStatusAC = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    preloader: {
      status
    }
  } as const
}
export const errorAC = (error: string | null) => {
  return {
    type: 'APP/SET-ERROR',
    preloader: {
      error
    }
  } as const
}
export const isInitializedAC = (value: boolean) => {
  return {
    type: 'APP/IS-INITIALIZED',
    preloader: {
      value
    }
  } as const
}

export type PreloaderStatusACType = ReturnType<typeof preloaderStatusAC>
export type ErrorACType = ReturnType<typeof errorAC>
export type IsInitializedACType = ReturnType<typeof isInitializedAC>

type ActionsType =
  | PreloaderStatusACType
  | ErrorACType
  | IsInitializedACType
