import { GridContent, PageContainer } from '@ant-design/pro-layout'
import { Tabs } from 'antd'
import React, { useState } from 'react'
import type { TabsProps } from 'antd'

import { Specialized, Post, Enterprise } from './TabContent'
import styles from './index.module.less'

const breadcrumb = {
  routes: [
    {
      path: '/',
      breadcrumbName: '首页',
    },
    {
      path: '/employmentStatistics',
      breadcrumbName: '就业统计',
    },
  ],
}
const MaterialManageList: React.FC = () => {
  const [state,setState]=useState('1')
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `按专业统计`,
      children: <Specialized currencyType={state}/>,
    },
    {
      key: '2',
      label: `按岗位统计`,
      children: <Post  currencyType={state} />,
    },
    {
      key: '3',
      label: `按企业统计`,
      children: <Enterprise  currencyType={state} />,
    },
  ]
  const onChange = (key: string) => {
    setState(key)
  }
  return (
    <PageContainer breadcrumb={breadcrumb}>
      <GridContent>
        <Tabs className={styles.tabWrap} defaultActiveKey='1' items={items} onChange={onChange} />;
      </GridContent>
    </PageContainer>
  )
}

export default MaterialManageList
