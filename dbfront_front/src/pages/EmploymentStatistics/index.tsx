import { GridContent, PageContainer } from '@ant-design/pro-layout'
import { Tabs } from 'antd'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Specialized, Post, Enterprise } from './TabContent'
import styles from './index.module.less'
// import { formatMessage } from '@/utils/locales'

const { TabPane } = Tabs
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
  const [query] = useSearchParams()

  const currencyType = query.get('currencyType')

  const [activeTab, setActiveTab] = useState<string>(currencyType || '1')

  return (
    <PageContainer breadcrumb={breadcrumb}>
      <GridContent>
        <Tabs
          defaultActiveKey={activeTab}
          type='card'
          className={styles.tabWrap}
          onChange={setActiveTab}
        >
          <TabPane tab='按专业统计' key='1'>
            <Specialized currencyType='1' activeTab={activeTab} />
          </TabPane>

          <TabPane tab='按岗位统计' key='3'>
            <Post currencyType='3' activeTab={activeTab} />
          </TabPane>
          <TabPane tab='按企业统计' key='4'>
            <Enterprise currencyType='4' activeTab={activeTab} />
          </TabPane>
        </Tabs>
      </GridContent>
    </PageContainer>
  )
}

export default MaterialManageList
