import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import {
    postsReducer
} from "./reducers/postsReducer";
import {
    usersReducer
} from "./reducers/usersReducer";
import systemReducer from "./reducers/systemReducer";
import {
    composeWithDevTools
} from "redux-devtools-extension"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    system: systemReducer,
    users: usersReducer,
    posts: postsReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;