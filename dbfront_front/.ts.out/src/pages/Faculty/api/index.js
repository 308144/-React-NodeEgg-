import service from '@/api/service';
export const findAllFaculty = data => {
    return service({ url: `/front/findAllFaculty`, data: data, method: 'post' });
};
export const removeOneFaculty = data => {
    return service({ url: `/front/removeOneFaculty/${data}`, method: 'get' });
};
export const echoOneFacultyData = data => {
    return service({ url: `/front/echoOneFacultyData/${data}`, method: 'get' });
};
//# sourceMappingURL=index.js.map