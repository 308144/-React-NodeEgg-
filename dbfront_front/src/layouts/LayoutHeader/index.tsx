import { Dropdown, Layout, Menu, message } from 'antd'
import React, { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import imgs from '@/assets/img/img.jpg'
import styles from './index.module.less'
import { useMemoizedFn } from '@/hooks'
import { logoutByMobile } from '@/pages/Login/api'
import {tokenStorage,userStorage} from '@/common/localStorage'

const { Header } = Layout

const items = [{ label: '退出登录', key: 'layout' }]
const MainHeader: React.FC = () => {
  const navigate = useNavigate()

  /** 点击菜单触发 */
  const onMenuClick = useMemoizedFn(async (props: { key: string }) => {
    switch (props.key) {
      case 'layout':
        const res = await logoutByMobile()
        if (res.data.code === 0) {
          message.success('退出登录成功')
          tokenStorage.removeItem()
          userStorage.removeItem()
        }
        navigate('/login')

        break;
      default:
        break;
    }
  })

  const menu = useMemo(() => <Menu onClick={onMenuClick} items={items} />, [])

  return (
    <>
      <Header className={styles.pandaLayoutHeader}>
        <div className={styles.header_left}>
          <div className={styles.img}>
            <img width='100%' height='100%' src={imgs} alt='小图片' />
          </div>
          <h1>
            <strong>高校就业管理系统</strong>
          </h1>
        </div>
        <div className={styles.userWrap}>
          <Dropdown overlay={menu}>
            <div>
              <img
                width={16}
                src='https://cdn01.xiongmaoboshi.com/asset/img/personalCenter-1656928659383-175.png'
              />
              个人中心
            </div>
          </Dropdown>
        </div>
      </Header>
    </>
  )
}

export default memo(MainHeader)
