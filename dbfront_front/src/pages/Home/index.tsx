import React from 'react'

import styles from './index.module.less'

import { useModel } from '@/store'

/** 首页 */
const HomePage = () => {
// 使用creat-store去获取当前用户信息
  const { userInfo } = useModel('user')

  return (
    <div className={styles.homePage}>
     <h1>欢迎来到高校就业学员管理系统</h1> 
      <h2>{userInfo.name}</h2>
    </div>
  )
}

export default HomePage
  