import service from '@/api/service';
export const findAllUser = data => {
    return service({ url: `/front/findAllUser`, data: data, method: 'post' });
};
export const removeOneUser = data => {
    return service({ url: `/front/removeOneUser/${data}`, method: 'get' });
};
export const echoOneUserData = data => {
    return service({ url: `/front/echoOneUserData/${data}`, method: 'get' });
};
//# sourceMappingURL=index.js.map