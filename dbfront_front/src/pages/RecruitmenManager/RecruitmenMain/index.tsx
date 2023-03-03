import { ActionType, GridContent, PageContainer, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import React, { useState } from 'react'
import { useRef } from 'react'
import { convertListDataToProTable } from '@/utils/tools'
import { Button, Modal, Popover, Tag } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
  ZoomInOutlined,
} from '@ant-design/icons'
import { AddUserModal } from '@/pages/RecruitmenManager/RecruitmenMain/Modal'
import { useModel } from '@/store'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'

import {
  findAllRecruitmen,
  removeOneRecruitmen,
  echoOneRecruitmenData,
} from '@/pages/RecruitmenManager/RecruitmenMain/api'
import RangePickerByBtn from '@/components/RangePickerByBtn'
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
    // {
    //   title: '序号',
    //   dataIndex: 'index',
    //   valueType: 'index',
    //   width: 48,
    // },
    {
      align: 'center',
      title: '招聘主题',
      dataIndex: 'recruitmentSubject',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      align: 'center',
      title: '发布日期',
      dataIndex: 'releaseDate',
      ellipsis: true,
      hideInSearch: true,
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
      hideInSearch: true,
    },
    {
      align: 'center',
      title: '招聘人电话',
      dataIndex: 'recruiterPhone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      align: 'center',
      title: '招聘人数',
      dataIndex: 'recruiterPersonCount',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      align: 'center',
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      render: (_, record) =>
        record.status === '0' ? <Tag color='#87d068'>有效</Tag> : <Tag color='#f50'>已失效</Tag>,
    },
    {
      width: 250,
      align: 'center',
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        // <Popover placement='bottom' zIndex={2} content={() => content(record)}>
        //   <SettingOutlined className={styles.setting} />
        // </Popover>
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
            onClick={() => findDetailData(record)}
            icon={<ZoomInOutlined />}
            size={'small'}
            style={{ marginRight: '15px' }}
          >
            查看
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
        await removeOneRecruitmen(_id)
        modal.destroy()
        reload()
      },
      onCancel() {
        modal.destroy()
      },
    })
  }
  //查看的方法
  const findDetailData = async record => {
    const { _id } = record
    navigate(`/recruitmenManager/recruitmenDetail`, { state: _id })
  }

  // 表格的编辑删除
  // const content = record => {
  //   return userInfo.identity === 'student' ? (
  //     <div className={styles.settingBtn}>
  //       <p className={styles.disable}>编辑</p>
  //       <p className={styles.disable}>删除</p>
  //     </div>
  //   ) : (
  //     <div className={styles.settingBtn}>
  //       <p onClick={() => updateOneData(record)}>编辑</p>
  //       <p className={styles.disable}>删除</p>
  //     </div>
  //   )
  // }
  // 回显数据
  const updateOneData = async record => {
    //按钮变成修改
    const { _id } = record
    const echoRes = await echoOneRecruitmenData(_id)
    const { data } = echoRes
    if (echoRes.code === 0) {
      setId(_id)
      setIsModalOpen(true)
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
    const res = await findAllRecruitmen({
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
        path: '/recruitmen',
        breadcrumbName: `招聘管理`,
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

// Post Enterprise
