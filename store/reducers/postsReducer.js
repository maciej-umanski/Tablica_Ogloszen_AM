import {
    CREATE_POST,
    GET_POSTS,
    UPDATE_POST,
    DELETE_POST
} from "../actions/posts";


export const postsReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_POST:
            return [...state, action.data];
        case GET_POSTS:
            return action.data;
        case UPDATE_POST:
            return state.map(post => (post.id === action.data.id ? action.data : post));
        case DELETE_POST:
            return state.filter(post => post.id !== action.dataId);
        default:
            return state;
    }
}