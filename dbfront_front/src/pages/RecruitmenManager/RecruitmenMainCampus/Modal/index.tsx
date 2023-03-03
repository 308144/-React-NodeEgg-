import { Button, Col, DatePicker, Form, FormInstance, message, Modal, Radio, Row } from 'antd'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import dayjs from 'dayjs'

import {
  recruitmenCampusCreate,
  updateRecruitmenCampus,
} from '@/pages/RecruitmenManager/RecruitmenMainCampus/Modal/api'
import { useModel } from '@/store'
import { getFacultyData } from '@/api'
import TextArea from 'antd/lib/input/TextArea'

interface IAddUserModal {
  id: string | null
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  reload: () => void
  isUpdate: boolean
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  formRefData: string
}

const AddUserModal = (props: IAddUserModal) => {
  const dateFormat = 'YYYY/MM/DD'

  const formRef = React.useRef<FormInstance>(null)
  const [form] = Form.useForm()
  const [isLoading, setIsLoadng] = useState<boolean>()
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)

  const { isModalOpen, setIsModalOpen, reload, isUpdate, setIsUpdate, formRefData, id } = props
  const { facultyInfo, setFacultyInfo } = useModel('faculty')
  // 回显时间的处理
  const radioRef = useRef()
  // // 回显单选的处理
  // const [radioState, setRadioState] = useState()

  useEffect(() => {
    setIsModalOpen(isModalOpen)
    if (facultyInfo) {
      selectData()
    }
  }, [isModalOpen])

  useEffect(() => {
    setIsUpdate(isUpdate)
    if (isUpdate) {
      if (formRefData) {
        // radioRef.current=formRefData.preachStatus
        form.setFieldsValue({
          preachEnterprise: dayjs(formRefData.preachEnterprise, dateFormat),
          preachTheme: formRefData.preachTheme,
          preachPost: formRefData.preachPost,
          preachSize: formRefData.preachSize,
          preachIndustry: formRefData.preachIndustry,
          preachStatus: formRefData.preachStatus,
        })
      }
    }
  }, [isUpdate])
  useEffect(() => {
    getFaculty()
  }, [])
  // 获取院系最新数据
  const getFaculty = async () => {
    const res = await getFacultyData()
    if (res.code === 0) {
      setFacultyInfo(res.data.records.map(item => item.faculty))
    }
  }
  const selectData = () => {
    const data = []
    facultyInfo?.map(item => {
      const a = { value: '', label: '' }
      a.value = item
      a.label = item
      data.push(a)
    })
  }

  // 弹窗关闭
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
    setIsUpdate(false)
  }

  // 修改或新增按钮
  const onFinish = async values => {
    if (!isUpdate) {
      setIsLoadng(true)
      const res = await recruitmenCampusCreate(values)
      if (res.code === 0) {
        setIsLoadng(false)
        setIsModalOpen(false)
        form.resetFields()
        message.success(res.msg)
        reload()
      } else {
        message.error(res.msg)
        setIsLoadng(false)
      }
    } else {
      setIsUpdateLoading(true)
      const res = await updateRecruitmenCampus({ values, id })
      if (res.code === 0) {
        setIsUpdateLoading(false)
        setIsModalOpen(false)
        setIsUpdate(false)
        form.resetFields()
        reload()
        message.success(res.msg)
      } else {
        message.error(res.msg)
        setIsLoadng(false)
      }
    }
  }

  // 弹窗字段
  const getFields = () => (
    <>
      <Col span={12} key={1}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='preachTheme'
          label='宣讲主题'
          rules={[
            {
              required: true,
              message: '请输入宣讲主题',
            },
          ]}
        >
          <TextArea placeholder='请输入宣讲主题' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={2}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='preachEnterprise'
          label='宣讲时间'
          rules={[
            {
              required: true,
              message: '请输入宣讲时间',
            },
          ]}
        >
          <DatePicker format={dateFormat} placeholder='请输入宣讲时间' style={{ width: '210px' }} />
        </Form.Item>
      </Col>
      <Col span={12} key={3}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='preachPost'
          label='宣讲公司'
          rules={[
            {
              required: true,
              message: '请输入宣讲公司',
            },
          ]}
        >
          <TextArea placeholder='请输入宣讲公司' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={4}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='preachSize'
          label='宣讲地点'
          rules={[
            {
              required: true,
              message: '请输入宣讲地点',
            },
          ]}
        >
          <TextArea placeholder='请输入宣讲地点' autoSize />
        </Form.Item>
      </Col>
      <Col span={24} key={5}>
        <Form.Item
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21, offset: 1 }}
          name='preachStatus'
          label='宣讲状态'
          rules={[
            {
              required: true,
              message: '请选择宣讲状态',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={0}>有效</Radio>
            <Radio value={1}>已失效</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={24} key={6}>
        <Form.Item
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21, offset: 1 }}
          name='preachIndustry'
          label='宣讲内容'
          rules={[
            {
              required: true,
              message: '请输入宣讲内容',
            },
          ]}
        >
          <TextArea placeholder='请输入宣讲内容' />
        </Form.Item>
      </Col>
    </>
  )
  return (
    <>
      <Modal
        width={700}
        open={isModalOpen}
        title={[
          <div key='1' className={styles.title}>
            <h2>新增招聘宣讲会</h2>
          </div>,
        ]}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20, offset: 1 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          ref={formRef}
        >
          <Row gutter={24}>{getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              {isUpdate ? (
                <Button
                  style={{ width: '150px' }}
                  type='primary'
                  htmlType='submit'
                  loading={isLoading}
                >
                  修改
                </Button>
              ) : (
                <Button
                  type='primary'
                  style={{ width: '150px' }}
                  htmlType='submit'
                  loading={isUpdateLoading}
                >
                  创建
                </Button>
              )}

              <Button
                style={{ margin: '0 8px', width: '150px' }}
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

export { AddUserModal }
