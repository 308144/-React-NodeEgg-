import service from '@/api/service';
export const findAllTeacher = data => {
    return service({ url: `/front/findAllTeacher`, data: data, method: 'post' });
};
export const removeOneTeacher = data => {
    return service({ url: `/front/removeOneTeacher/${data}`, method: 'get' });
};
export const echoOneTeacherData = data => {
    return service({ url: `/front/echoOneTeacherData/${data}`, method: 'get' });
};
//# sourceMappingURL=index.js.map