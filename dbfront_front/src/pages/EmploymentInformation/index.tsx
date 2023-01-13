import { PlusOutlined, SettingOutlined } from '@ant-design/icons'

import moment from 'moment'
import {
  createInformation,
  findInformation,
  removeOneInformation,
  updateOneInformation,
  echoOneInformationData,
} from './api'
import { RefData } from './api/type'
import { ActionType, idIDIntl, ProColumns } from '@ant-design/pro-components'
import { formRules } from './api/reg'
import { ProTable } from '@ant-design/pro-components'
import { Button, Col, DatePicker, Form, message, Modal, Popover, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { convertListDataToProTable } from '@/utils/tools'
import './index.less'
const { Option } = Select

type GithubIssueItem = {
  class: string
  competencyRequirements: string
  employmentPost: string
  employmentTimer: string
  employmentUnits: string
  employmentUnitsAddress: string
  name: string
  phone: string
  sex: number
  specialized: string
  treatment: string
}
const EmploymentInformation: React.FC = () => {
  // 是否收起搜索表单
  const [searchCollapsed, setSearchCollapsed] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoadng] = useState<boolean>()
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const resitFormDataRef = useRef<RefData>()
  const [updatePhoneState, setUpdatePhoneState] = useState()
  const actionRef = useRef<ActionType>()

  const [form] = Form.useForm()
  // 表格的编辑删除
  const content = record => {
    return (
      <div className='settingBtn'>
        <p onClick={() => updateOneData(record)}>编辑</p>
        <p onClick={() => deleteOneData(record)}>删除</p>
      </div>
    )
  }
  // 性别的处理
  const sexContent = record => {
    const { sex } = record
    if (sex === 1) {
      return '男'
    } else {
      return '女'
    }
  }
  // 删除按钮
  const deleteOneData = async record => {
    const { phone } = record
    const res = await removeOneInformation(phone)
    //
    const { data } = res
    if (data.code === 0) {
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
    actionRef.current.reload()
  }
  // 修改数据
  const updateOneData = async record => {
    setIsUpdate(true) //按钮变成修改
    const { phone } = record
    setUpdatePhoneState(phone)
    const echoRes = await echoOneInformationData(phone)
    const { data } = echoRes
    resitFormDataRef.current = data.records[0]
    if (echoRes.code === 0) {
      setIsModalOpen(true)
      form.setFieldsValue({
        class: resitFormDataRef.current.class,
        competencyRequirements: resitFormDataRef.current.competencyRequirements,
        employmentPost: resitFormDataRef.current.employmentPost,
        employmentTimer: resitFormDataRef.current.employmentTimer
          ? moment(resitFormDataRef.current.employmentTimer, 'YYYY-MM-DD')
          : undefined,
        employmentUnits: resitFormDataRef.current.employmentUnits,
        employmentUnitsAddress: resitFormDataRef.current.employmentUnitsAddress,
        name: resitFormDataRef.current.name,
        phone: resitFormDataRef.current.phone,
        sex: resitFormDataRef.current.sex,
        specialized: resitFormDataRef.current.specialized,
        treatment: resitFormDataRef.current.treatment,
      })
    }

    // setIsUpdate(true)
  }
  // 查看
  const phoneContent = record => {
    const { phone } = record
    return <div style={{ height: '20', width: '15' }}>{phone}</div>
  }

  const columns: ProColumns<GithubIssueItem>[] = [
    { key: 'name', align: 'center', title: '姓名', dataIndex: 'name', ellipsis: true },
    {
      key: 'class',
      align: 'center',
      title: '班级',
      hideInSearch: true,
      dataIndex: 'class',
      ellipsis: true,
    },
    {
      key: 'specialized',
      align: 'center',
      title: '专业',
      dataIndex: 'specialized',
      ellipsis: true,
    },
    {
      key: 'sex',
      align: 'center',
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => sexContent(record),
    },
    {
      key: 'phone',
      align: 'center',
      title: '电话',
      dataIndex: 'phone',
      ellipsis: true,
      render: (_, record) => (
        <Popover content={() => phoneContent(record)} trigger='click'>
          <a style={{ color: 'blue' }}>查看</a>
        </Popover>
      ),
    },
    {
      width: 150,
      key: 'employmentTimer',
      align: 'center',
      title: '就业时间',
      dataIndex: 'employmentTimer',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => {
        const { employmentTimer } = record
        return employmentTimer.slice(0, 10)
      },
    },
    {
      key: 'employmentPost',
      align: 'center',
      title: '就业岗位',
      dataIndex: 'employmentPost',
      ellipsis: true,
    },
    {
      key: 'employmentUnits',
      align: 'center',
      title: '就业单位',
      dataIndex: 'employmentUnits',
      ellipsis: true,
    },
    {
      key: 'employmentUnitsAddress',

      align: 'center',
      title: '就业单位地址',
      dataIndex: 'employmentUnitsAddress',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      key: 'competencyRequirements',
      width: 55,
      align: 'center',
      title: '待遇',
      dataIndex: 'treatment',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      align: 'center',
      key: 'competencyRequirements',
      title: '能力要求',
      dataIndex: 'competencyRequirements',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      align: 'center',
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 70,
      render: (_, record) => (
        <Popover placement='bottom' zIndex={2} content={() => content(record)}>
          <SettingOutlined className='setting' />
        </Popover>
      ),
    },
  ]

  // 展示弹窗
  const showModal = () => {
    setIsUpdate(false)
    form.resetFields()
    setIsModalOpen(true)
  }
  // 弹窗确定
  const handleOk = () => {
    setIsModalOpen(false)
  }
  // 取消弹窗
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // 弹窗表单完成
  const onFinish = async (values: any) => {
    if (!isUpdate) {
      setIsLoadng(true)
      const res = await createInformation(values)
      if (res.data.code === 0) {
        setIsLoadng(false)
        setIsModalOpen(false)
        form.resetFields()
        const { msg } = res.data
        message.success(msg)
        actionRef.current.reload()
      } else {
        message.error('创建学员失败')
        setIsLoadng(false)
      }
    } else {
      setIsUpdateLoading(true)
      const params = Object.assign(values, { idPhone: updatePhoneState })

      const updateRes = await updateOneInformation(params)

      if (updateRes.data.code === 0) {
        setIsUpdateLoading(false)
        setIsModalOpen(false)
        form.resetFields()
        const { msg } = updateRes.data
        message.success(msg)
        actionRef.current.reload()
      } else {
        message.error('修改学员失败')
        setIsLoadng(false)
      }
    }
  }
  // 请求数据
  const requestFun = async params => {
    const { current, pageSize } = params
    delete params.pageSize
    for (const key in params) {
      if (typeof params[key] === 'string') {
        params[key] = params[key].trim()
      }
    }
    const res = await findInformation({
      current,
      size: pageSize,
      ...params,
    })
    const output = convertListDataToProTable(res.data)
    return output
  }
  // 弹窗字段
  const getFields = () => (
    <>
      <Col span={8} key={1}>
        <Form.Item
          name='name'
          label='姓名'
          rules={[
            {
              required: true,
              message: '请输入姓名',
            },
          ]}
        >
          <TextArea placeholder='请输入姓名' autoSize />
        </Form.Item>
      </Col>
      <Col span={8} key={2}>
        <Form.Item
          name='class'
          label='班级'
          rules={[
            {
              required: true,
              message: '请输入班级',
            },
          ]}
        >
          <TextArea placeholder='请输入班级' autoSize />
        </Form.Item>
      </Col>
      <Col span={8} key={3}>
        <Form.Item
          name='specialized'
          label='专业'
          rules={[
            {
              required: true,
              message: '请输入专业',
            },
          ]}
        >
          <TextArea placeholder='请输入班级' autoSize />
        </Form.Item>
      </Col>
      <Col span={8} key={4}>
        <Form.Item
          name='sex'
          label='性别'
          rules={[
            {
              required: true,
              message: '请输入性别',
            },
          ]}
        >
          <Select placeholder='请选择性别'>
            <Option value={1}>男</Option>
            <Option value={0}>女</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8} key={5}>
        <Form.Item name='phone' label='手机号' rules={formRules.IphoneReg}>
          <TextArea placeholder='请输入手机号' autoSize />
        </Form.Item>
      </Col>
      <Col span={8} key={6}>
        <Form.Item
          name='treatment'
          label='待遇'
          rules={[
            {
              required: true,
              message: '请输入待遇',
            },
          ]}
        >
          <TextArea placeholder='请输入待遇' autoSize />
        </Form.Item>
      </Col>
      <Col span={8} key={7}>
        <Form.Item
          name='employmentTimer'
          label='就业时间'
          rules={[
            {
              required: true,
              message: '请输入就业时间',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Col>
      <Col span={8} key={8}>
        <Form.Item
          name='employmentPost'
          label='就业岗位'
          rules={[
            {
              required: true,
              message: '请输入就业岗位',
            },
          ]}
        >
          <TextArea placeholder='请输入就业岗位' autoSize />
        </Form.Item>
      </Col>
      <Col span={8} key={9}>
        <Form.Item
          name='employmentUnits'
          label='就业单位'
          rules={[
            {
              required: true,
              message: '请输入就业单位',
            },
          ]}
        >
          <TextArea placeholder='请输入就业单位' autoSize />
        </Form.Item>
      </Col>
      <Col span={8} key={10}>
        <Form.Item
          name='employmentUnitsAddress'
          label='就业单位地址'
          rules={[
            {
              required: true,
              message: '请输入就业单位地址',
            },
          ]}
        >
          <TextArea placeholder='请输入就业单位地址' autoSize />
        </Form.Item>
      </Col>

      <Col span={8} key={11}>
        <Form.Item
          name='competencyRequirements'
          label='能力要求'
          rules={[
            {
              required: true,
              message: '请输入能力要求',
            },
          ]}
        >
          <TextArea placeholder='请输入能力要求' autoSize />
        </Form.Item>
      </Col>
    </>
  )

  return (
    <>
      <ProTable<GithubIssueItem>
        search={{
          collapsed: searchCollapsed,
          onCollapse: (collapsed: boolean) => {
            setSearchCollapsed(collapsed)
          },
          // @ts-ignore
          optionRender: (_, { form }: { form }) => [
            <Button
              key='resetText'
              type='default'
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              重置
            </Button>,
            <Button
              key='searchText'
              type='primary'
              onClick={() => {
                form?.submit()
              }}
              size='middle'
            >
              查询
            </Button>,
          ],
        }}
        toolBarRender={() => [
          <Button key='add' onClick={showModal} icon={<PlusOutlined />} type='primary'>
            新增就业信息
          </Button>,
        ]}
        columns={columns}
        actionRef={actionRef}
        request={requestFun}
        rowKey='id'
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        dateFormatter='string'
      />
      <Modal
        width={1000}
        title={
          [
            <div key='1' className='modal'>
              <h2>个人信息</h2>
            </div>,
          ]
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        key='1'
        // destroyOnClose
      >
        <Form
          form={form}
          name='advanced_search'
          className='ant-advanced-search-form'
          onFinish={onFinish}
        >
          <Row gutter={24}>{getFields()}</Row>

          {/* 搜索重置 */}

          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              {isUpdate ? (
                <Button type='primary' htmlType='submit' loading={isLoading}>
                  修改
                </Button>
              ) : (
                <Button type='primary' htmlType='submit' loading={isUpdateLoading}>
                  创建
                </Button>
              )}

              <Button
                style={{ margin: '0 8px' }}
                onClick={() => {
                  form.resetFields()
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default EmploymentInformation
