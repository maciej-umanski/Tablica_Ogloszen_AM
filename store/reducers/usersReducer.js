import {
    CREATE_USER,
    GET_USERS,
    UPDATE_USER,
    DELETE_USER
} from "../actions/users";

export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_USER:
            return [...state, action.data];
        case GET_USERS:
            return action.data;
        case UPDATE_USER:
            return state.map(user => (user.id === action.data.id ? action.data : user));
        case DELETE_USER:
            return state.filter(user => user.id !== action.dataId);
        default:
            return state;
    }
}