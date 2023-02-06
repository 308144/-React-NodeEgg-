import service from '@/api/service';
export const findDetailData = data => {
    return service({ url: `/nodeServe/findDetailData`, data, method: 'post' });
};
//# sourceMappingURL=index.js.map
