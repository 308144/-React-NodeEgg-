import service from '@/api/service';
export const getFacultyData = () => {
    return service({ url: '/nodeServe/getFacultyData', method: 'get' });
};
//# sourceMappingURL=index.js.map
