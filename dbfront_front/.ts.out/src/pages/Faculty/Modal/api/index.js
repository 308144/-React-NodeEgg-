import service from '@/api/service';
export const facultyCreate = data => {
    return service({ url: `/front/facultyCreate`, data: data, method: 'post' });
};
export const updateFaculty = data => {
    return service({ url: `/front/updateFaculty`, data: data, method: 'post' });
};
//# sourceMappingURL=index.js.map