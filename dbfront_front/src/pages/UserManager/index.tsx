import { ActionType, GridContent, PageContainer, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import React, {  useState } from 'react'
import { useRef } from 'react'
import { convertListDataToProTable } from '@/utils/tools'
import { Button, message, Popover } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { AddUserModal,BulkAddUserModal } from '@/pages/UserManager/Modal'

import styles from './index.module.less'
import { useModel } from '@/store'

import { findAllUser, removeOneUser, echoOneUserData } from '@/pages/UserManager/api'
const detailSpecialized: React.FC = () => {
  const actionRef = useRef<ActionType>()
  const { userInfo } = useModel('user')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bulkIsModalOpen, setBulkIsModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const resitFormDataRef = useRef()
  const showModal = () => {
    setIsModalOpen(true)
  }
  type GithubIssueItem = {
    account: string
    identity: string
  }
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    { align: 'center', title: '账号', dataIndex: 'userName', ellipsis: true },
    {
      align: 'center',
      title: '身份',
      dataIndex: 'identity',
      ellipsis: true,
      hideInSearch: true,
      render(_, record) {
        return identityContent(record)
      },
    },
    {
      align: 'center',
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <Popover placement='bottom' zIndex={2} content={() => content(record)}>
          <SettingOutlined className={styles.setting}/>
        </Popover>
      ),
    },
  ]
  // 表格的编辑删除
  const identityContent = record => {
    const { identity } = record
    if (identity === 'manager') {
      return '管理员'
    } else if (identity === 'student') {
      return '学生'
    }
  }
  // 表格的编辑删除
  const content = record => {
    return userInfo.identity === 'student' ? (
      <div className={styles.settingBtn}>
        <p className={styles.disable}>编辑</p>
        <p className={styles.disable}>删除</p>
      </div>
    ) : (
      <div className={styles.settingBtn}>
        <p onClick={() => updateOneData(record)}>编辑</p>
        <p onClick={() => deleteOneData(record)}>删除</p>
      </div>
    )
  }
  // 修改数据
  const updateOneData = async record => {
    //按钮变成修改
    const { userName } = record
    const echoRes = await echoOneUserData(userName)
    const { data } = echoRes
    if (echoRes.code === 0) {
      setIsModalOpen(true)
      resitFormDataRef.current = data[0]
      setIsUpdate(true)
    }
  }
  // 删除按钮
  const deleteOneData = async record => {
    const { userName } = record
    const res = await removeOneUser(userName)

    if (res.code === 0) {
      message.success('删除用户成功')
    } else {
      message.error('删除用户失败')
    }
    actionRef.current.reload()
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
    const res = await findAllUser({
      ...params,
    })
    const output = convertListDataToProTable(res)
    return output
  }
  const bulkAddUserModal=()=>{
    setBulkIsModalOpen(true)
  }
  const breadcrumb = {
    routes: [
      {
        path: '/',
        breadcrumbName: '首页',
      },
      {
        path: '/userManager',
        breadcrumbName: `用户管理`,
      },
    ],
  }
  return (
    <PageContainer breadcrumb={breadcrumb}>
      <GridContent>
        <ProTable<GithubIssueItem>
          toolBarRender={() => [
            <Button key='add' disabled={userInfo.identity==='student'}  onClick={showModal} icon={<PlusOutlined />} type='primary'>
              新增用户信息
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
          headerTitle={
            <>
              <Button disabled={userInfo.identity==='student'}  key='logout' type='primary' onClick={bulkAddUserModal}>
                批量添加用户信息
              </Button>
            </>
          }
        />
        <AddUserModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          reload={reload}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          formRefData={resitFormDataRef.current}
        ></AddUserModal>
        <BulkAddUserModal
        bulkIsModalOpen={bulkIsModalOpen}
        setBulkIsModalOpen={setBulkIsModalOpen}
        reload={reload}


        />
      </GridContent>
    </PageContainer>
  )
}

export default detailSpecialized

// Post Enterprise
