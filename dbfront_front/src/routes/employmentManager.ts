import React from 'react'

import { Route } from './index'

import EmploymentInformation from '@/pages/EmploymentManager/EmploymentInformation'
import EmploymentStatistics from '@/pages/EmploymentManager/EmploymentStatistics'
import EmploymentStatisticsDetail from '@/pages/EmploymentManager/EmploymentStatistics/EmploymentStatisticsDetail'
import EmploymentAnalyzeReports from '@/pages/EmploymentManager/EmploymentAnalysis'
import UserManager from '@/pages/UserManager'
import Teacher from '@/pages/TeacherSudentMan/Teacher'
import Faculty from '@/pages/Faculty/Faculty'
import RecruitmenMain from '@/pages/RecruitmenManager/RecruitmenMain'
import RecruitmenMainCampus from '@/pages/RecruitmenManager/RecruitmenMainCampus'
import RecruitmenMainDetail from '@/pages/RecruitmenManager/RecruitmenMainDetail'
import EmploymentStatisticsPic from '@/pages/EmploymentManager/EmploymentStatisticsPic'
import ErrorBoundary from '@/components/ErrorBoundary'
// import { ShoppingOutlined, SolutionOutlined } from '@ant-design/icons'

export default [
  {
    name: '就业统计表',
    path: '/employmentStatisticsPic',
    element: ErrorBoundary(EmploymentStatisticsPic),
  },
  {
    name: '就业管理',
    path: '/employmentManager',
    routes: [
      {
        name: '就业统计',
        path: '/employmentStatistics',
        element: ErrorBoundary(EmploymentStatistics),
      },
      {
        hideInMenu: true,
        name: '详情',
        path: '/detail',
        element: ErrorBoundary(EmploymentStatisticsDetail),
      },
      {
        name: '就业信息',
        // icon: <ShoppingOutlined />,
        path: '/employmentInformation',
        element: ErrorBoundary(EmploymentInformation),
      },
      // 11

      {
        name: '分析报告',
        path: '/analyzeReports',
        element: ErrorBoundary(EmploymentAnalyzeReports),
      },
    ],
  },
  {
    name: '师生管理',
    path: '/teacherStudentManager',
    routes: [
      {
        name: '教师管理',
        path: '/teacher',
        element: ErrorBoundary(Teacher),
      },
      // 111
      {
        name: '学生管理',
        path: '/student',
        element: ErrorBoundary(Teacher),
      },
    ],
  },
  {
    name: '院系管理',
    path: '/faculty',
    routes: [
      {
        name: '院系管理',
        path: '/faculty',
        element: ErrorBoundary(Faculty),
      },
      // 111
      {
        name: '专业管理',
        path: '/specialized',
        element: ErrorBoundary(Faculty),
      },
    ],
  },

  {
    name: '用户管理',
    path: '/userManager',
    element: ErrorBoundary(UserManager),
  },

  {
    name: '招聘信息',
    path: '/recruitmenManager',
    routes: [
      { name: '招聘管理', path: '/recruitmen', element: React.createElement(RecruitmenMain) },
      {
        name: '招聘信息详情',
        path: '/recruitmenDetail',
        element: ErrorBoundary(RecruitmenMainDetail),
        hideInMenu: true,
      },
      {
        name: '招聘宣讲会',
        path: '/recruitmenCampus',
        element: ErrorBoundary(RecruitmenMainCampus),
      },
    ],
  },
] as Route[]
