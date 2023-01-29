import { Button, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { EmploymentStatisticsList } from '@/pages/EmploymentStatistics/api'
import { useNavigate } from 'react-router-dom'
interface ITabPaneParameter {
  currencyType: string
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
// 专业
export const Specialized = (props: ITabPaneParameter) => {
  const [specializedState, setSpecializedState] = useState()
  const navigate = useNavigate()
  const { currencyType } = props
  const getListData = async currencyType => {
    const res = await EmploymentStatisticsList(currencyType)
    const { data } = res
    data.forEach((item, index) => {
      item['key'] = index + 1
    })
    setSpecializedState(data)
  }
  useEffect(() => {
    getListData(currencyType)
  }, [currencyType])
  const findDetail = (currencyType, record) => {
    const { specialized } = record
    navigate('/detail', { state: { currencyType, specialized } })
  }

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
      dataIndex: 'specializedNumber',
      key: 'specialized',
    },
    {
      align: 'center',
      title: '操作',
      key: 'option',
      render: (_, record) => (
        <Button
          type='primary'
          onClick={() => {
            findDetail(currencyType, record)
          }}
        >
          查看详情
        </Button>
      ),
    },
  ]
  return <Table columns={columns} dataSource={specializedState} />
}
// 岗位
export const Post = (props: ITabPaneParameter) => {
  const [postState, setPostState] = useState()
  const navigate = useNavigate()

  const { currencyType } = props
  const getListData = async currencyType => {
    const res = await EmploymentStatisticsList(currencyType)
    const { data } = res
    data.forEach((item, index) => {
      item['key'] = index + 1
    })
    setPostState(data)
  }

  useEffect(() => {
    getListData(currencyType)
  }, [currencyType])
  const findDetail = (currencyType, record) => {
    const { post } = record
    navigate('/detail', { state: { currencyType, post } })
  }

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
      dataIndex: 'postNumber',
      key: 'postNumber',
    },
    {
      align: 'center',
      title: '操作',
      key: 'option',
      render: (_, record) => (
        <Button
          type='primary'
          onClick={() => {
            findDetail(currencyType, record)
          }}
        >
          查看详情
        </Button>
      ),
    },
  ]

  return <Table columns={columns} dataSource={postState} />
}

// 企业
export const Enterprise = (props: ITabPaneParameter) => {
  const [enterpriseState, setEnterpriseState] = useState()
  const { currencyType } = props
  const navigate = useNavigate()
  const getListData = async currencyType => {
    const res = await EmploymentStatisticsList(currencyType)
    const { data } = res
    data.forEach((item, index) => {
      item['key'] = index + 1
    })
    setEnterpriseState(data)
  }

  useEffect(() => {
    getListData(currencyType)
  }, [currencyType])

  const findDetail = (currencyType, record) => {
    const { enterprise } = record
    navigate('/detail', { state: { currencyType, enterprise } })
  }
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
      dataIndex: 'enterpriseNumber',
      key: 'enterpriseNumber',
    },
    {
      align: 'center',
      title: '操作',
      key: 'option',
      render: (_, record) => (
        <Button
          type='primary'
          onClick={() => {
            findDetail(currencyType, record)
          }}
        >
          查看详情
        </Button>
      ),
    },
  ]
  return <Table columns={columns} dataSource={enterpriseState} />
}
