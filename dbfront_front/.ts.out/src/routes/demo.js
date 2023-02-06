import React from 'react';
import EmploymentInformation from '@/pages/EmploymentInformation';
import EmploymentStatistics from '@/pages/EmploymentStatistics';
import EmploymentStatisticsDetail from '@/pages/EmploymentStatistics/EmploymentStatisticsDetail';
import UserManager from '@/pages/UserManager';
import Teacher from '@/pages/Teacher';
import Faculty from '@/pages/Faculty';
export default [
    {
        name: '就业信息',
        path: '/employmentInformation',
        element: React.createElement(EmploymentInformation),
    },
    {
        name: '就业统计',
        path: '/employmentStatistics',
        element: React.createElement(EmploymentStatistics),
    },
    {
        name: '用户管理',
        path: '/userManager',
        element: React.createElement(UserManager),
    },
    {
        hideInMenu: true,
        name: '详情',
        path: '/detail',
        element: React.createElement(EmploymentStatisticsDetail),
    },
    {
        name: '教师管理',
        path: '/teacher',
        element: React.createElement(Teacher),
    },
    {
        name: '院系管理',
        path: '/faculty',
        element: React.createElement(Faculty),
    },
];
//# sourceMappingURL=demo.js.map