import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { EmploymentStatisticsList } from '@/pages/EmploymentManager/EmploymentStatistics/api'
import { useNavigate } from 'react-router-dom'
interface ITabPaneParameter {
  currencyType: string
}

interface ISpecializedDataType {
  _id: string
  employedNumber: string
  key?: string
}

interface IPostDataType {
  _id: string
  employedNumber: string
  key?: string
}
interface IEnterpriseDataType {
  _id: string
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
    const { _id } = record
    navigate('/detail', { state: { currencyType, _id } })
  }

  const columns: ColumnsType<ISpecializedDataType> = [
    {
      align: 'center',
      title: '学生专业',
      dataIndex: '_id',
      key: 'specialized',
    },
    {
      align: 'center',
      title: '就业人数',
      dataIndex: 'specializedNumber',
      key: 'specializedNumber',
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
    const { _id } = record
    navigate('/detail', { state: { currencyType, _id } })
  }

  const columns: ColumnsType<IPostDataType> = [
    {
      align: 'center',
      title: '就业岗位',
      dataIndex: '_id',
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
    const { _id } = record
    navigate('/detail', { state: { currencyType, _id } })
  }
  const columns: ColumnsType<IEnterpriseDataType> = [
    {
      align: 'center',
      title: '就业单位',
      dataIndex: '_id',
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
