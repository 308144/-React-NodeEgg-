import service from '@/api/service';
export const adminCreate = data => {
    return service({ url: `/nodeServe/adminCreate`, data: data, method: 'post' });
};
export const updateUser = data => {
    return service({ url: `/nodeServe/updateUser`, data: data, method: 'post' });
};
export const uploadExcle = data => {
    return service({ url: `/nodeServe/uploadExcle`, data: data, method: 'post' });
};
//# sourceMappingURL=index.js.map
