import service from '@/api/service';
export const findAllUser = data => {
    return service({ url: `/nodeServe/findAllUser`, data: data, method: 'post' });
};
export const removeOneUser = data => {
    return service({ url: `/nodeServe/removeOneUser/${data}`, method: 'get' });
};
export const echoOneUserData = data => {
    return service({ url: `/nodeServe/echoOneUserData/${data}`, method: 'get' });
};
//# sourceMappingURL=index.js.map
