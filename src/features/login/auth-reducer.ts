import {Dispatch} from "redux";
import {errorAC, ErrorACType, isInitializedAC, IsInitializedACType, preloaderStatusAC} from "../../state/app-reducer";
import {authApi} from "../../api/todolists-api";
import {AxiosError} from "axios";
import {LoginDataType} from "./Login";

const initialState = {
  isLoggedIn: false
}

export const authReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN": {
      return {
        ...state,
        isLoggedIn: action.payload.value
      }
    }
    default:
      return state;
  }
}


export const loginAC = (value: boolean) => {
  return {
    type: 'SET_IS_LOGGED_IN',
    payload: {
      value
    }
  } as const
}


export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  authApi.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(loginAC(true))
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
export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  authApi.logOut()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(loginAC(false))
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

export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(preloaderStatusAC('loading'))
  authApi.authMe()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(loginAC(true))
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
      dispatch(isInitializedAC(true))
    })
}


//type
export type LoginACType = ReturnType<typeof loginAC>

type ActionsType =
  | LoginACType
  | IsInitializedACType

type InitialState = typeof initialState

