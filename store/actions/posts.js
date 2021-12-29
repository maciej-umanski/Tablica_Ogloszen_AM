import axios from "axios";
import {
    SERVER_HOST
} from "../../conf";

export const CREATE_POST = "CREATE_POST";
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const receivePosts = (data) => {
    return {
        type: GET_POSTS,
        data: data
    }
}
export const addPost = (data) => {
    return {
        type: CREATE_POST,
        data: data
    }
}
export const editPost = (data) => {
    return {
        type: UPDATE_POST,
        data: data
    }
}
export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        dataiD: id
    }
}

export const createPost = (data) => {
    return (dispatch) => {
        axios.post(`${SERVER_HOST}/posts`, data).then((response) => {
            dispatch(addPost(response.data));
        }).catch(err => console.warn(err.response))
    }
}

export const getPosts = () => {
    return (dispatch) => {
        axios.get(`${SERVER_HOST}/posts`).then((response) => {
            dispatch(receivePosts(response.data))
        }).catch(err => console.warn(err.response))
    }
}
export const updatePost = (data) => {
    return (dispatch) => {
        axios.put(`${SERVER_HOST}/posts`, data).then((response) => {
            dispatch(editPost(response.data))
        }).catch(err => console.warn(err.response))
    }
}
export const removePost = (postId) => {
    return (dispatch) => {
        axios.delete(`${SERVER_HOST}/posts/${postId}`).then((response) => {
            dispatch(deletePost(postId))
        }).catch(err => console.warn(err.response))
    }
}

export const getPostById = (id) => {
    return axios.get(`${SERVER_HOST}/posts/${id}`).then((response) => {
        return response.data[0];
    }).catch(err => console.warn(err.response))
}