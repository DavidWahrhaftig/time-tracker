import axios from 'axios';
import store from './store';
// import router from './router';
// import appConfig from '@/config';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

axiosInstance.interceptors.request.use(req => {
    return req;
}, error => {
    console.log(error);
    return error;
})
axiosInstance.interceptors.response.use(res => {
    if (res.config.method !== 'get') {
        store.commit('setServerFeedback', res.data);
    }
    return res;
}, 
    error => {
        if (error.response) {
            // console.log(error.response);
            store.commit('setServerFeedback', error.response.data);
        } else {
            store.commit('setServerFeedback', {msg: error.message, success: false});
        }
        return error;
    }
);

export default axiosInstance;