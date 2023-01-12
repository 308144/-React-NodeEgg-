import React, { memo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import styles from './index.module.less'
import LayoutHeader from './LayoutHeader'
import LayoutSlider from './LayoutSlider'

import { routes, Route as RouteType } from '@/routes'

/** 获取在loyout中的页面 */
const flatRoutes = [<Route key='*' path='*' element={<Navigate replace to='/404' />} />]
/** 获取不在loyout中的页面 */
const noLayout = [<Route key='*' path='*' element={<Navigate replace to='/404' />} />]
/** 获取不在loyout中的页面map映射 */
const noLayoutMap: { [index: string]: true } = {}

const getFlatRoutes = (parentKey: string, routes: RouteType[] = []) => {
  routes.forEach(item => {
    const { path, element } = item
    if (!item.singlePage) {
      flatRoutes.push(<Route key={parentKey + path} path={parentKey + path} element={element} />)
      if (Array.isArray(item.routes) && item.routes.length) {
        flatRoutes.push(...getFlatRoutes(`${parentKey}${item.path}`, item.routes))
      }
    } else {
      noLayoutMap[path] = true
      noLayout.push(<Route key={path} path={path} element={element} />)
    }
  })
  return flatRoutes
}
getFlatRoutes('', routes)

/** 渲染路由 */
const RenderRoutes: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <>
      {noLayoutMap[pathname] ? (
        <Routes>{noLayout.map(item => item)}</Routes>
      ) : (
        <>
          <div className={styles.layoutWrap}>
            <LayoutSlider />
            <div className={styles.layout}>
              <LayoutHeader />
              <div className={styles.contentWrap}>
                <Routes>{flatRoutes.map(item => item)}</Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default memo(RenderRoutes)
