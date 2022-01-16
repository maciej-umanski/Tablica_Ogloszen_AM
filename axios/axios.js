import axios from 'axios';

let store;
export const injectStore = _store => {
    store = _store
}

axios.interceptors.request.use(config => {
    config.headers.authorization = store.getState().system.token;
    return config;
})