// import React from 'react'

// import { Route } from './index'

// export default [
//   {
//     name: 'demo页面',
//     path: '/demo',
//     element: React.createElement('h2', {}, 'demo页面'),
//     routes: [
//       {
//         name: '子页面1',
//         path: '/child1',
//         element: React.createElement('h2', {}, '子页面1'),
//         routes: [
//           {
//             name: '子页面1-1',
//             path: '/child1-1',
//             element: React.createElement('h2', {}, '子页面1-1'),
//             routes: [
//               {
//                 name: '子页面1-1-1',
//                 path: '/child1-1-1',
//                 element: React.createElement('h2', {}, '子页面1-1-1'),
//               },
//               {
//                 name: '子页面1-1-2',
//                 path: '/child1-1-2',
//                 element: React.createElement('h2', {}, '子页面1-1-2'),
//               },
//             ],
//           },
//           {
//             name: '子页面1-2',
//             path: '/child1-2',
//             element: React.createElement('h2', {}, '子页面1-2'),
//           },
//         ],
//       },
//       {
//         name: '子页面2',
//         path: '/child2',
//         element: React.createElement('h2', {}, '子页面2'),
//       },
//     ],
//   },

// ] as Route[]
import { ShoppingOutlined } from '@ant-design/icons'
import React from 'react'

import { Route } from './index'

import EmploymentInformation from '@/pages/EmploymentInformation'
import EmploymentStatistics from '@/pages/EmploymentStatistics'
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
    // routes: [
    //   {
    //     name: '按专业统计',
    //     path: '/employmentStatistics/professional',
    //     element: React.createElement(AppList),
    //   },
    //   {
    //     name: '按班级统计',
    //     path: '/employmentStatistics/class',
    //     element: React.createElement(GameDetail),
    //   },
    //   {
    //     hideInMenu: true,
    //     name: '按企业统计',
    //     path: '/employmentStatistics/post',
    //     element: React.createElement(AppStore),
    //   },
    //   {
    //     name: '按岗位统计',
    //     path: '/employmentStatistics/business',
    //     element: React.createElement(VersionEdit),
    //   },
    // ],
  },
  {
    name: '用户管理',
    path: '/userManager',
    element: React.createElement(UserManager),
  },
] as Route[]
