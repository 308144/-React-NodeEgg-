import service from '@/api/service';
export const adminCreate = data => {
    return service({ url: `/front/adminCreate`, data: data, method: 'post' });
};
export const updateUser = data => {
    return service({ url: `/front/updateUser`, data: data, method: 'post' });
};
export const uploadExcle = data => {
    return service({ url: `/front/uploadExcle`, data: data, method: 'post' });
};
//# sourceMappingURL=index.js.map