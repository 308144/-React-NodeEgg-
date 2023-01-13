import { Button, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import { EmploymentStatisticsList } from '@/pages/EmploymentStatistics/api'

interface ITabPaneParameter {
  currencyType: string
  activeTab: string
}

interface ISpecializedDataType {
  specialized: string
  employedNumber: string
  key?: string
}

interface IPostDataType {
  post: string
  employedNumber: string
  key?: string
}
interface IEnterpriseDataType {
  enterprise: string
  employedNumber: string
  key?: string
}
export const Specialized = (props: ITabPaneParameter) => {
  const { currencyType } = props

  const getListData = async(currencyType) => {

    const res=await EmploymentStatisticsList(currencyType)
    console.log('系统的',res);


  }

  useEffect(() => {getListData(currencyType)}, [])
  const columns: ColumnsType<ISpecializedDataType> = [
    {
      align: 'center',
      title: '学生专业',
      dataIndex: 'specialized',
      key: 'specialized',
    },
    {
      align: 'center',
      title: '就业人数',
      dataIndex: 'employedNumber',
      key: 'employedNumber',
    },
    {
      align: 'center',
      title: '操作',
      key: 'option',
      render: (_, record) => <Button type='primary'>查看详情</Button>,
    },
  ]
  const data: ISpecializedDataType[] = [
    { key: '1', specialized: '网络工程', employedNumber: '1' },
    { key: '2', specialized: '通信工程', employedNumber: '2' },
    { key: '3', specialized: '电子工程', employedNumber: '3' },
    { key: '4', specialized: '大数据信息', employedNumber: '4' },
  ]

  return <Table columns={columns} dataSource={data} />
}

export const Post = (props: ITabPaneParameter) => {
  const columns: ColumnsType<IPostDataType> = [
    {
      align: 'center',
      title: '就业岗位',
      dataIndex: 'post',
      key: 'post',
    },
    {
      align: 'center',
      title: '就业人数',
      dataIndex: 'employedNumber',
      key: 'employedNumber',
    },
    {
      align: 'center',
      title: '操作',
      key: 'option',
      render: (_, record) => <Button type='primary'>查看详情</Button>,
    },
  ]
  const data: IPostDataType[] = [
    { key: '1', post: 'Web前端', employedNumber: '1' },
    { key: '2', post: 'Java后端', employedNumber: '2' },
    { key: '3', post: 'php', employedNumber: '3' },
    { key: '4', post: 'go', employedNumber: '4' },
    { key: '5', post: '服务器', employedNumber: '5' },
  ]

  return <Table columns={columns} dataSource={data} />
}

// 单位
export const Enterprise = (props: ITabPaneParameter) => {
  const columns: ColumnsType<IEnterpriseDataType> = [
    {
      align: 'center',
      title: '就业单位',
      dataIndex: 'enterprise',
      key: 'enterprise',
    },
    {
      align: 'center',
      title: '就业人数',
      dataIndex: 'employedNumber',
      key: 'employedNumber',
    },
    {
      align: 'center',
      title: '操作',
      key: 'option',
      render: (_, record) => <Button type='primary'>查看详情</Button>,
    },
  ]
  const data: IEnterpriseDataType[] = [
    { key: '1', enterprise: '字节', employedNumber: '77' },
    { key: '2', enterprise: '好未来', employedNumber: '88' },
    { key: '3', enterprise: '知乎', employedNumber: '99' },
    { key: '4', enterprise: '京东', employedNumber: '98' },
  ]

  return <Table columns={columns} dataSource={data} />
}
