import axios from 'axios';
import service from '@/api/service';
export const createInformation = data => {
    return axios.post('/nodeServe/createInformation', data);
};
export const findInformation = params => {
    return axios.post('/nodeServe/findInformation', params);
};
export const updateOneInformation = params => {
    return axios.post(`/nodeServe/updateOneInformation`, params);
};
export const removeOneInformation = data => {
    return service({ url: `/nodeServe/removeInformation`, data: data, method: 'post' });
};
export const echoOneInformationData = phone => {
    return service({ url: `/nodeServe/echoOneInformationData/${phone}`, method: 'get' });
};
export const getSelectTeacherDatas = data => {
    return service({ url: `/nodeServe/selectTeacherDatas/${data}`, method: 'get' });
};
export const getInformationModalTeacherPhoneData = data => {
    return service({ url: '/nodeServe/getInformationModalTeacherPhoneData', data, method: 'post' });
};
//# sourceMappingURL=index.js.map
