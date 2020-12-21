import axios from 'axios';
import store from './store';
// import router from './router';
// import appConfig from '@/config';



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

axiosInstance.interceptors.request.use(req => {
    // if (req.data) console.log("[axios.ts] deletingUser: " + req.data.deletingUser);
    if (req.headers.hideLoading) console.log("[axios.ts] showLoading: " + req.headers.hideLoading);
    console.log("[axios.ts] headers: ", req.headers);
    if(!req.headers.hideLoading) {
        store.commit('setIsLoading', true);
    }
    return req;
}, error => {
    store.commit('setIsLoading', false);
    console.log('intercepted request error');
    store.commit('setError', error.messsage);
    return error;
})
axiosInstance.interceptors.response.use(res => {
    store.commit('setIsLoading', false);
    return res;
}, 
    error => {
        console.log(error.message);
        store.commit('setIsLoading', false);
        console.log('intercepted response error');
        // console.log(error);
        store.commit('setError', error.message);
        return error;
    }
);

export default axiosInstance;