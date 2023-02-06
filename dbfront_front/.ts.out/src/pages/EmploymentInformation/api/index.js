import axios from 'axios';
import service from '@/api/service';
export const createInformation = data => {
    return axios.post('/front/createInformation', data);
};
export const findInformation = params => {
    return axios.post('/front/findInformation', params);
};
export const updateOneInformation = params => {
    return axios.post(`/front/updateOneInformation`, params);
};
export const removeOneInformation = data => {
    return service({ url: `/front/removeInformation`, data: data, method: 'post' });
};
export const echoOneInformationData = phone => {
    return service({ url: `/front/echoOneInformationData/${phone}`, method: 'get' });
};
export const getSelectTeacherDatas = data => {
    return service({ url: `/front/selectTeacherDatas/${data}`, method: 'get' });
};
export const getInformationModalTeacherPhoneData = data => {
    return service({ url: '/front/getInformationModalTeacherPhoneData', data, method: 'post' });
};
//# sourceMappingURL=index.js.map