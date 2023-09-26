export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string
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

export type PreloaderStatusACType = ReturnType<typeof preloaderStatusAC>
export type ErrorACType = ReturnType<typeof errorAC>

type ActionsType =
  | PreloaderStatusACType
  | ErrorACType
