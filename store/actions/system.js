import axios from "axios";
import {SERVER_HOST} from "../../conf";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (data) => {
    return {
        type: LOGIN,
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
        axios.post(`${SERVER_HOST}/login`, data).then((response) => {
            if(response.data?.success){
                dispatch(login(response.data?.user))
            }
            callback(response.data)
    }).catch(err => console.warn(err.response))
}
}

// TODO:dodać na backendzie endpoint
export const logoutUser = (dataId) => {
    return dispatch => {
        axios.post(`${SERVER_HOST}/logout`, dataId).then((response) => {
            dispatch(logout())
    }).catch(err => console.warn(err.response))
}
}