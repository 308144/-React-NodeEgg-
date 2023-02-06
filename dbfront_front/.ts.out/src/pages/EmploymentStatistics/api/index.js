import service from '@/api/service';
export const EmploymentStatisticsList = (currentType) => {
    return service({
        url: `/front/employmentStatisticsList/${currentType}`,
        method: 'get',
    });
};
//# sourceMappingURL=index.js.map