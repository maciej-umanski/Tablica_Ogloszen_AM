import axios from "axios";
import {
    SERVER_HOST
} from "../../conf";
import {
    login
} from "./system"

export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const receiveUsers = (data) => {
    return {
        type: GET_USERS,
        data: data
    }
}
export const addUser = (data) => {
    return {
        type: CREATE_USER,
        data: data
    }
}
export const editUser = (data) => {
    return {
        type: UPDATE_USER,
        data: data
    }
}
export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        dataiD: id
    }
}

export const register = (data, callback = () => null) => {
    return (dispatch) => {
        axios.post(`${SERVER_HOST}/sign_up`, data).then((response) => {
            dispatch(addUser(response.data[0]));
            dispatch(login(response.data[0]))
            callback()
        }).catch(err => console.warn(err.response))
    }
}

export const getUsers = (callback = () => null) => {
    return (dispatch) => {
        axios.get(`${SERVER_HOST}/users`).then((response) => {
            dispatch(receiveUsers(response.data))
            callback(response.data)
        }).catch(err => console.warn(err.response))
    }
}

export const getUserById = (id, callback = () => null) => {
    return axios.get(`${SERVER_HOST}/users/${id}`).then((response) => {
        callback(response.data[0])
    }).catch(err => console.warn(err.response))
}

export const updateUser = (data) => {
    return (dispatch) => {
        axios.put(`${SERVER_HOST}/users`, data).then((response) => {
            dispatch(editUser(response.data));
        }).catch(err => console.warn(err.response))
    }
}

export const removeUser = (dataId) => {
    return (dispatch) => {
        axios.delete(`${SERVER_HOST}/users/${dataId}`).then((response) => {
            dispatch(deleteUser(dataId));
        }).catch(err => console.warn(err.response))
    }
}