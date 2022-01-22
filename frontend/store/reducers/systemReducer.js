import {
    LOGIN,
    LOGOUT,
    EDIT_LOGGED_USER
} from "../actions/system"

const systemInitialState = {
    user: {},
    isLogged: false,
    token: ""
}

const systemReducer = (state = systemInitialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {user: action.data.user, isLogged: true, token: action.data.token};
        case LOGOUT:
            return {...systemInitialState};
        case EDIT_LOGGED_USER:
            return {...state, user: action.data}
        default:
            return state;
    }
}

export default systemReducer;