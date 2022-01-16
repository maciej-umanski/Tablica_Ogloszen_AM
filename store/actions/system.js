import axios from "axios";
import {SERVER_HOST} from "../../conf";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const EDIT_LOGGED_USER = "EDIT_LOGGED_USER";

export const login = (data) => {
    return {
        type: LOGIN,
        data: data
    }
}

export const editLoggedUser = (data) => {
    return {
        type: EDIT_LOGGED_USER,
        data: data
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const loginUser = (data, callback = () => null) => {
    return (dispatch) => {
        axios.post(`${SERVER_HOST}/login`, data).then(async (response) => {
            if (response.data?.success) {
                dispatch(login(response.data))
            }
            callback(response.data)
        }).catch(err => console.warn(err.response))
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(logout())
    }
}