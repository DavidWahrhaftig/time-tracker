import axios from 'axios';
import store from './store';

// set base url for api 
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// request interceptor
axiosInstance.interceptors.request.use(req => {
    return req;
}, error => {
    console.log(error);
    return error;
})

// response interceptor
axiosInstance.interceptors.response.use(res => {
    if (res.config.method !== 'get') {
        const key = new Date().toISOString();
        store.commit('setServerFeedback', {...res.data, key});
    }
    return res;
}, 
    error => {
        const key = new Date().toISOString();
        if (error.response) {
            // when error is caught by the application server and a custom error is set
            store.commit('setServerFeedback', {...error.response.data, key});
        } else {
            // when error is not handled by the server (e.g. Network Error)
            store.commit('setServerFeedback', {msg: error.message, success: false, key});
        }
        return error;
    }
);

export default axiosInstance;