import { ActionType, GridContent, PageContainer, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { findDetailData } from '@/pages/EmploymentManager/EmploymentStatistics/EmploymentStatisticsDetail/api'
import { convertListDataToProTable } from '@/utils/tools'

const detailSpecialized: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [title, setTitle] = useState<string>()
  const [detailData, setDetailData] = useState()
  const [currentTypeState, setCurrentTypeState] = useState()
  const [property, setProperty] = useState<string>()
  const localtion = useLocation()
  const { state } = localtion
  useEffect(() => {
    getData()
  }, [state.currencyType])
  const getData = () => {
    setCurrentTypeState(state.currencyType)
    if (state.currencyType === '1') {
      setTitle('专业')
      setDetailData(state._id)
      setProperty('specialized')
    } else if (state.currencyType === '2') {
      setTitle('岗位')
      setDetailData(state._id)
      setProperty('employmentPost')
    } else {
      setTitle('企业')
      setDetailData(state._id)
      setProperty('employmentUnits')
    }
  }
  type GithubIssueItem = {
    name: string
    specialized: string
    phone: string
  }
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    { align: 'center', title: '姓名', dataIndex: 'name', ellipsis: true },
    {
      align: 'center',
      title: `${title}`,
      dataIndex: `${property}`,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      align: 'center',
      title: '手机号',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
  ]
  // 请求数据
  const requestFun = async params => {
    for (const key in params) {
      if (typeof params[key] === 'string') {
        params[key] = params[key].trim()
      }
    }
    const res = await findDetailData({
      params: { ...params },
      data: { currentTypeState, detailData },
    })
    const output = convertListDataToProTable(res)
    return output
  }
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
      {
        path: '/detail',
        breadcrumbName: `${title}统计`,
      },
    ],
  }
  return (
    <PageContainer breadcrumb={breadcrumb}>
      <GridContent>
        <ProTable<GithubIssueItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          editable={{
            type: 'multiple',
          }}
          request={requestFun}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
          }}
          rowKey='id'
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          pagination={{
            pageSize: 5,
            onChange: page => console.log(page),
          }}
          dateFormatter='string'
          headerTitle='高级表格'
        />
      </GridContent>
    </PageContainer>
  )
}

export default detailSpecialized

// Post Enterprise
