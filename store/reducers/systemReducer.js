import { LOGIN, LOGOUT} from "../actions/system"

const systemInitialState = {
    user: {},
    isLogged: false
}

const systemReducer = (state = systemInitialState, action) => {
    switch (action.type){
        case LOGIN:
            return { user: action.data, isLogged: true};
        case LOGOUT:
            return {...systemInitialState};
        default:
            return state;
    }
}

export default systemReducer;