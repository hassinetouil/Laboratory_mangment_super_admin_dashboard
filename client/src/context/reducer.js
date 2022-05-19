import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    ADD_USER_BEGIN,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
} from "./actions";
import { initialState } from './appContext'
const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values ' }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === ADD_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === ADD_USER_SUCCESS) {
        return {
            ...state, isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userlocation: action.payload.location,
            joblocation: action.payload.joblocation,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Created ! Redirectiong...',
        }
    }
    if (action.type === ADD_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,

        }
    }
    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successful! Redirecting...',
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSidebar: !state.showSidebar }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: '',
        }
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_USERS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_USERS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            users: action.payload.users,
            totalUsers: action.payload.totalUsers,
        }
    }
    throw new Error(`no such action : ${action.type}`)

}
export default reducer;