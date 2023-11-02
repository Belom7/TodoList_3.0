import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {appActions} from "app/app-reducer";
import {authAPI, LoginParamsType} from "features/auth/authApi";

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ setIsLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.setIsLoggedIn
        },

    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions


// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({setIsLoggedIn: true}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({setIsLoggedIn: false}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}