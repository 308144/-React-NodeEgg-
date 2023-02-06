import service from '@/api/service';
export const teacherCreate = data => {
    return service({ url: `/front/teacherCreate`, data: data, method: 'post' });
};
export const updateTeacher = data => {
    return service({ url: `/front/updateTeacher`, data: data, method: 'post' });
};
//# sourceMappingURL=index.js.map