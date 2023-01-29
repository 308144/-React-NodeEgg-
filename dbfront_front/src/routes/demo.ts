import { ShoppingOutlined } from '@ant-design/icons'
import React from 'react'

import { Route } from './index'

import EmploymentInformation from '@/pages/EmploymentInformation'
import EmploymentStatistics from '@/pages/EmploymentStatistics'
import EmploymentStatisticsDetail from '@/pages/EmploymentStatistics/EmploymentStatisticsDetail'
import UserManager from '@/pages/UserManager'

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
] as Route[]
