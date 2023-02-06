import service from '@/api/service';
export const facultyCreate = data => {
    return service({ url: `/nodeServe/facultyCreate`, data: data, method: 'post' });
};
export const updateFaculty = data => {
    return service({ url: `/nodeServe/updateFaculty`, data: data, method: 'post' });
};
//# sourceMappingURL=index.js.map
