import axios from 'axios';
export const userLogin = (data) => {
    return axios.post('/front/login', data);
};
export const logoutByMobile = () => {
    return axios.post('/front/logout');
};
//# sourceMappingURL=index.js.map