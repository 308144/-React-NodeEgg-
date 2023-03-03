import { ActionType, GridContent, PageContainer, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import React, { useState } from 'react'
import { useRef } from 'react'
import { convertListDataToProTable } from '@/utils/tools'
import { Button, Modal, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, ZoomInOutlined } from '@ant-design/icons'
import { AddUserModal } from '@/pages/RecruitmenManager/RecruitmenMainCampus/Modal'
import { useModel } from '@/store'
import { useNavigate } from 'react-router-dom'

import {
  findAllRecruitmenCampus,
  removeOneRecruitmenCampus,
  echoOneRecruitmenCampusData,
} from '@/pages/RecruitmenManager/RecruitmenMainCampus/api'
const detailSpecialized: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const { userInfo } = useModel('user')
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [id, setId] = useState(null)
  const resitFormDataRef = useRef()
  const showModal = () => {
    setIsModalOpen(true)
  }
  type GithubIssueItem = {
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
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      align: 'center',
      title: '宣讲主题',
      dataIndex: 'preachTheme',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '宣讲时间',
      dataIndex: 'preachEnterprise',
      ellipsis: true,
      hideInSearch: true,
    },
    { align: 'center', title: '宣讲公司', dataIndex: 'preachPost', ellipsis: true },
    {
      align: 'center',
      title: '宣讲地点',
      dataIndex: 'preachSize',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      align: 'center',
      title: '宣讲内容',
      dataIndex: 'preachIndustry',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      hideInSearch: true,
      align: 'center',
      title: '宣讲状态',
      dataIndex: 'preachStatus',
      ellipsis: true,
      render: (_, record) =>
        record.preachStatus === '0' ? (
          <Tag color='#87d068'>有效</Tag>
        ) : (
          <Tag color='#f50'>已失效</Tag>
        ),
    },
    {
      width: 250,
      align: 'center',
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <div>
          <Button
            onClick={() => updateOneData(record)}
            icon={<EditOutlined />}
            size={'small'}
            style={{ marginRight: '15px' }}
          >
            编辑
          </Button>

          <Button
            type='primary'
            onClick={() => removeOneData(record)}
            icon={<DeleteOutlined />}
            size={'small'}
            danger
          >
            删除
          </Button>
        </div>
      ),
    },
  ]

  // 删除的方法
  const removeOneData = async record => {
    const { _id } = record
    const modal = Modal.confirm({
      title: '提示',
      content: '确定删除该招聘信息吗?',
      async onOk() {
        await removeOneRecruitmenCampus(_id)
        modal.destroy()
        reload()
      },
      onCancel() {
        modal.destroy()
      },
    })
  }
  // 回显数据
  const updateOneData = async record => {
    //按钮变成修改
    const { _id } = record
    const echoRes = await echoOneRecruitmenCampusData(_id)
    const { data } = echoRes
    if (echoRes.code === 0) {
      setId(_id)
      setIsModalOpen(true)
      const preachEnterprise = data[0].preachEnterprise.replaceAll('-', '/').slice(0, 10)
      data[0].preachEnterprise = preachEnterprise
      resitFormDataRef.current = data[0]
      setIsUpdate(true)
    }
  }
  // 刷新方法，传递给弹窗
  const reload = () => {
    actionRef.current.reload()
  }
  // 请求数据
  const requestFun = async params => {
    for (const key in params) {
      if (typeof params[key] === 'string') {
        params[key] = params[key].trim()
      }
    }
    const res = await findAllRecruitmenCampus({
      ...params,
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
        path: '/recruitmenCampus',
        breadcrumbName: `招聘宣讲会`,
      },
    ],
  }
  return (
    <PageContainer breadcrumb={breadcrumb}>
      <GridContent>
        <ProTable<GithubIssueItem>
          toolBarRender={() => [
            <Button
              key='add'
              disabled={userInfo.identity === 'student'}
              onClick={showModal}
              icon={<PlusOutlined />}
              type='primary'
            >
              添加
            </Button>,
          ]}
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
          rowKey='_id'
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
        />
        <AddUserModal
          id={id}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          reload={reload}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          formRefData={resitFormDataRef.current}
        ></AddUserModal>
      </GridContent>
    </PageContainer>
  )
}

export default detailSpecialized
