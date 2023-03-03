import { ReactElement } from 'react'

import demoRoutes from './employmentManager'
import errorRoutes from './error'
import userRoutes from './user'

import { ErrorBoundary } from '@/components'
import HomePage from '@/pages/Home'

export interface Route {
  name?: string
  path: string
  icon?: React.ReactNode
  // 页面是否包含Menu菜单
  hideMenu?: boolean
  // menu菜单中是否隐藏
  hideInMenu?: boolean
  // 权限验证
  access?: string[]
  // 页面组件
  element: ReactElement | JSX.IntrinsicElements
  // 子路由
  routes?: Route[]
  // 是否是单独存在的页面
  singlePage?: boolean
}

const indexRoutes: Route[] = [{ path: '/home', name: '欢迎', element: ErrorBoundary(HomePage) }]

// 首页
// const indexRoutes:Route[]=[{path:'/home',name:'首页',element:ErrorBoundary(HomePage)}]

export const routes = [...indexRoutes, ...userRoutes, ...demoRoutes, ...errorRoutes] as Route[]
