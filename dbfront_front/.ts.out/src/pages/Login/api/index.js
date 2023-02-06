import axios from 'axios';
export const userLogin = (data) => {
    return axios.post('/nodeServe/login', data);
};
export const logoutByMobile = () => {
    return axios.post('/nodeServe/logout');
};
//# sourceMappingURL=index.js.map
