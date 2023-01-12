import { Route } from './index'

import { ErrorBoundary } from '@/components'
import LogInPage from '@/pages/Login'

export default [
  {
    name: '登录',
    path: '/login',
    access: [],
    hideInMenu: true,
    hideMenu: true,
    singlePage: true,
    element: ErrorBoundary(LogInPage),
  },
] as Route[]
