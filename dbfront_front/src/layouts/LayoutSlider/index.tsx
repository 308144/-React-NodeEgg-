import { Layout, Menu } from 'antd'
import React, { memo, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.less'
import { getMenuItemsByRoute } from './router'

import { useMemoizedFn } from '@/hooks'
import { routes } from '@/routes'

const { Sider } = Layout
const reg = /\/\//g

function getChildPath(pathname: string) {
  const pathSnippets = pathname.split('/')
  const length = pathSnippets.length
  const newList = []
  function getNewItem(parentPath: string, path: string, index: number) {
    if (index < length) {
      const currentPath = `${parentPath ? `${parentPath}` : parentPath}/${path}`.replace(reg, '/')
      newList.push(currentPath)
      getNewItem(currentPath, pathSnippets[index + 1], index + 1)
    }
  }
  getNewItem('', pathSnippets[0], 0)
  return newList
}

const menuItems = getMenuItemsByRoute(routes)

const LayoutSlider: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  /** 切换菜单 */
  const onMenuClick = useMemoizedFn(({ key }) => navigate(key))

  const { pathname } = useLocation()
  /** 计算当前选中的菜单 */
  const selectedKeys = useMemo(() => getChildPath(pathname), [pathname])

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      collapsible
      className={styles.slider}
      theme='dark'
    >
      {/* <div className={styles.sliderImg} /> */}
      <Menu
        theme='dark'
        onClick={onMenuClick}
        defaultOpenKeys={selectedKeys}
        selectedKeys={selectedKeys}
        mode='inline'
        className='main-menu'
        items={menuItems}
      />
    </Sider>
  )
}

export default memo(LayoutSlider)
