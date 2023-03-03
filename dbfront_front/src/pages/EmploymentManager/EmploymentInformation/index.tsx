import { PlusOutlined, SettingOutlined } from '@ant-design/icons'

import moment from 'moment'
import {
  createInformation,
  findInformation,
  removeOneInformation,
  updateOneInformation,
  echoOneInformationData,
  getSelectTeacherDatas,
  getInformationModalTeacherPhoneData,
} from './api'
import { RefData } from './api/type'
import { ActionType, ProColumns } from '@ant-design/pro-components'
import { formRules } from './api/reg'
import { ProTable } from '@ant-design/pro-components'
import { Button, Col, DatePicker, Form, message, Modal, Popover, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { convertListDataToProTable } from '@/utils/tools'
import styles from './index.module.less'
import { useModel } from '@/store'
import { getFacultyData } from '@/api'

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
interface ISelectData {
  value: string
  label: string
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
  const [selectFacultyDatas, setSelectDatas] = useState<ISelectData[]>()
  const [selectTeacherDatas, setSelectTeacherDatas] = useState<ISelectData[]>()
  const [iselectTeacherDatas, setIselectTeacherDatas] = useState(true)
  // 叫教师手机号下拉
  const [iselectTeacherPhoneDatas, setIselectTeacherPhoneDatas] = useState(true)
  //老师下拉表单改变时获取老师手机号的Select值
  const [selectTeacherPhoneDatas, setSelectTeacherPhoneDatas] = useState<string>()
  const [yuanXiChangeData, setYuanXiChangeData] = useState<ISelectData>()
  const actionRef = useRef<ActionType>()

  const { userInfo } = useModel('user')
  const [form] = Form.useForm()
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
    const { phone, specialized, employmentUnits, employmentPost } = record
    const res = await removeOneInformation({ phone, specialized, employmentUnits, employmentPost })

    if (res.code === 0) {
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
    console.log('resitFormDataRef.current',resitFormDataRef.current);

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
        teacher: resitFormDataRef.current.teacher,
        faculty: resitFormDataRef.current.faculty,
        teacherPhone: resitFormDataRef.current.teacherPhone,
      })
    }
  }

  // 获取院系最新数据
  const getFaculty = async () => {
    const data = []
    const res = await getFacultyData()
    if (res.code === 0) {
      const facultyArrayData = res.data.records.map(item => item.faculty)
      facultyArrayData?.map(item => {
        const a = { value: '', label: '' }
        a.value = item
        a.label = item
        data.push(a)
      })
      setSelectDatas(data)
    }
  }
  useEffect(() => {
    getFaculty()
  }, [])

  // 查看
  const phoneContent = record => {
    const { phone } = record
    return <div style={{ height: '20', width: '15' }}>{phone}</div>
  }

  const columns: ProColumns<GithubIssueItem>[] = [
    { key: 'name', align: 'center', title: '姓名', dataIndex: 'name', ellipsis: true },
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
      key: 'faculty',
      align: 'center',
      title: '院系',
      dataIndex: 'faculty',
      ellipsis: true,
    },
    {
      key: 'teacher',
      align: 'center',
      title: '教师',
      dataIndex: 'teacher',
      ellipsis: true,
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
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 70,
      render: (_, record) => (
        <Popover placement='bottom' zIndex={2} content={() => content(record)}>
          <SettingOutlined className={styles.setting} />
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
    setIselectTeacherDatas(true)
    setIselectTeacherPhoneDatas(true)
  }

  // 弹窗表单完成
  const onFinish = async (values) => {
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
        setIselectTeacherDatas(true)
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

  // 下拉教师改变的时候
  const teacherSelectChange = async value => {
    if (value) {
      setIselectTeacherPhoneDatas(false)
      const res = await getInformationModalTeacherPhoneData({
        teacherName: value,
        faculty: yuanXiChangeData,
      })
      fengzhuangModalFun(setSelectTeacherPhoneDatas, res, 2)
      console.log('selectTeacherPhoneDatas', selectTeacherPhoneDatas)
    }
  }

  // 学院下拉列表改变的时候
  const facultySelectChange = async value => {
    if (value) {
      setIselectTeacherDatas(false)
      // 把学员当前的value保存进去，使用院系+老师来确定手机号
      setYuanXiChangeData(value)
      // 院系每次修改的时候，我们把老师的弹窗制空
      form.setFieldsValue({
        teacher: '',
        teacherPhone:''
      })
      const res = await getSelectTeacherDatas(value)
      fengzhuangModalFun(setSelectTeacherDatas, res, 1)
    }
  }
  const fengzhuangModalFun = (setState, res, T) => {
    if (res.code === 0) {
      if (T == 1) {
        const states = []
        const data = res.data.records.map(item => item.teacherName)
        data?.map(item => {
          const a = { value: '', label: '' }
          a.value = item
          a.label = item
          states.push(a)
        })
        setState(states)
      } else {
        console.log(111)

        const statess = []

        const phoneData = res.data.records.map(item => item.teacherPhone)
        phoneData?.map(item => {
          const a = { value: '', label: '' }
          a.value = item
          a.label = item
          statess.push(a)
        })
        console.log('statess', statess)

        setState(statess)
      }
    }
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
          name='faculty'
          label='院系'
          rules={[
            {
              required: true,
              message: '请选择院系',
            },
          ]}
        >
          <Select
            style={{ width: '100%' }}
            options={selectFacultyDatas}
            onChange={facultySelectChange}
          />
        </Form.Item>
      </Col>
      <Col span={8} key={12}>
        <Form.Item
          name='teacher'
          label='教师'
          rules={[
            {
              required: true,
              message: '请选择教师',
            },
          ]}
        >
          <Select
            onChange={teacherSelectChange}
            style={{ width: '100%' }}
            disabled={iselectTeacherDatas}
            options={selectTeacherDatas}
          />
        </Form.Item>
      </Col>
      <Col span={8} key={13}>
        <Form.Item name='teacherPhone' label='教师手机号'>
          <Select
            style={{ width: '100%' }}
            disabled={iselectTeacherPhoneDatas}
            options={selectTeacherPhoneDatas}
          />
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
          <Button
            disabled={userInfo.identity === 'student'}
            key='add'
            onClick={showModal}
            icon={<PlusOutlined />}
            type='primary'
          >
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
        title={[
          <div key='1' className='modal'>
            <h2>个人信息</h2>
          </div>,
        ]}
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
