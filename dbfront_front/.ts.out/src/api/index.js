import service from '@/api/service';
export const getFacultyData = () => {
    return service({ url: '/front/getFacultyData', method: 'get' });
};
//# sourceMappingURL=index.js.map