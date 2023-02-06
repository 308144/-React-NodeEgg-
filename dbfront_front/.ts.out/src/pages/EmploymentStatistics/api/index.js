import service from '@/api/service';
export const EmploymentStatisticsList = (currentType) => {
    return service({
        url: `/nodeServe/employmentStatisticsList/${currentType}`,
        method: 'get',
    });
};
//# sourceMappingURL=index.js.map
