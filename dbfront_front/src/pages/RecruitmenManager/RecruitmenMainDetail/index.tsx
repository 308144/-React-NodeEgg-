import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { echoOneRecruitmenData } from '@/pages/RecruitmenManager/RecruitmenMain/api'
import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { PageContainer } from '@ant-design/pro-components'

const RecruitmenMainDetail: React.FC = () => {
  const { state } = useLocation()
  const [states, setStates] = useState()
  const detailsData = async () => {
    const res = await echoOneRecruitmenData(state)
    const { data } = res
    if (res.code === 0) {
      setStates(data)
    }
  }
  useEffect(() => {
    detailsData()
  }, [])

  interface DataType {
    recruitmentSubject: string
    releaseDate: string
    recruitmentPost: string
    enterpriseSize: string
    Industry: string
    placeWork: string
    businessMailbox: string
    recruiterPhone: string
    recruiterPersonCount: string
    status: string
  }

  const columns: ColumnsType<DataType> = [
    {
      align: 'center',
      title: '招聘主题',
      dataIndex: 'recruitmentSubject',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '发布日期',
      dataIndex: 'releaseDate',
      ellipsis: true,
    },
    { align: 'center', title: '招聘企业', dataIndex: 'recruitmentPost', ellipsis: true },
    { align: 'center', title: '企业规模', dataIndex: 'enterpriseSize', ellipsis: true },
    { align: 'center', title: '所属行业', dataIndex: 'Industry', ellipsis: true },
    { align: 'center', title: '工作地点', dataIndex: 'placeWork', ellipsis: true },
    {
      align: 'center',
      title: '企业邮箱',
      dataIndex: 'businessMailbox',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '招聘人电话',
      dataIndex: 'recruiterPhone',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '招聘人数',
      dataIndex: 'recruiterPersonCount',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      render: (_, record) =>
        record.status === '0' ? <Tag color='#87d068'>有效</Tag> : <Tag color='#f50'>已失效</Tag>,
    },
  ]

  const breadcrumb = {
    routes: [
      {
        path: '/',
        breadcrumbName: '首页',
      },
      {
        path: '/recruitmenManager/recruitmen',
        breadcrumbName: `招聘管理`,
      },
      {
        path: '/recruitmenManager/recruitmenDetail',
        breadcrumbName: `招聘信息详情`,
      },
    ],
  }
  return (
    <PageContainer breadcrumb={breadcrumb}>
      <Table columns={columns} dataSource={states} />
    </PageContainer>
  )
}

export default RecruitmenMainDetail
