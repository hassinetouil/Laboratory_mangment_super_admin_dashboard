import React, { useReducer, useContext } from 'react';
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
    LOGOUT_USER
} from "./actions";
import axios from 'axios';
import reducer from './reducer';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alerttext: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    LabLocation: userLocation || '',
    showSidebar: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const authFetch = axios.create({
        baseURL: '/api/v1',
        headers: {
            Authorization: `Bearer ${state.token}`,
        },
    })
    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(error.response)
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000);
    }
    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }


    const addUser = async (currentUser) => {
        dispatch({ type: ADD_USER_BEGIN })
        try {
            const response = await axios.post('api/v1/auth/add-user', currentUser);
            console.log(response);
            const { user, token } = response.data;
            dispatch({
                type: ADD_USER_SUCCESS,
                payload: { user, token },
            })

        }
        //local storage later
        catch (error) {
            console.log(error.response)

            dispatch({
                type: ADD_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert();


    }
    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const { data } = await axios.post('/api/v1/auth/login', currentUser)
            console.log(data)
            const { user, token } = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token },
            })

            addUserToLocalStorage({ user, token })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }
    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/update-User', currentUser)

            // no token
            const { user, token } = data

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, token },
            })
            delete user.password
            addUserToLocalStorage({ user, token: initialState.token})
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }
    return (
        <AppContext.Provider value={{ ...state, displayAlert, addUser, loginUser, toggleSidebar, logoutUser, updateUser }}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return (useContext(AppContext));
}
export { AppProvider, initialState };