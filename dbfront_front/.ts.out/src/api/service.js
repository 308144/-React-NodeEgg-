import { notification } from 'antd';
import axios from 'axios';
import { tokenStorage } from '@/common/localStorage';
const service = axios.create({
    timeout: 10000,
    withCredentials: true,
});
service.interceptors.request.use(config => {
    return config;
}, error => {
    console.log('error_req');
    return Promise.reject(error);
});
service.interceptors.response.use(response => {
    return response.data;
}, err => {
    const { response } = err;
    if (response && response.status) {
        if (response.status === 401) {
            window.location.href = '/#/login';
            notification.error({
                message: '无访问权限',
                description: '请重新登录，没有携带cookie',
            });
            tokenStorage.removeItem('dbfrontToken');
            window.setCookie('token', '', -1);
        }
        else if (response.status === 403) {
            window.location.href = '/#/login';
            notification.error({
                message: 'Token失效',
                description: 'token过期或token不匹配，请重新登录',
            });
            tokenStorage.removeItem('dbfrontToken');
            window.setCookie('token', '', -1);
        }
    }
    else {
        if (!window.navigator.onLine) {
            notification.error({
                message: '网络异常',
                description: '请检查网络是否连接',
            });
            return;
        }
        return Promise.reject(err);
    }
});
export default service;
//# sourceMappingURL=service.js.map