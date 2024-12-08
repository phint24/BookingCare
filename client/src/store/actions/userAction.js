import actionTypes from './actionTypes';

export const userLoginSuccess = (userData) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userData: userData
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
})

export const userProcessLogout = () => ({
    type: actionTypes.USER_PROCESS_LOGOUT,
})

