import { Button, Form, FormInstance, Input, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'

import { teacherCreate, updateTeacher } from '@/pages/Teacher/Modal/api'

import { useModel } from '@/store'
import { getFacultyData } from '@/api'
import { phoneRules } from '@/utils/tools'

interface IAddUserModal {
  id: string | null
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  reload: () => void
  isUpdate: boolean
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  formRefData: string
}
interface ISelectData {
  value: string
  label: string
}
const AddUserModal = (props: IAddUserModal) => {
  const formRef = React.useRef<FormInstance>(null)
  const [form] = Form.useForm()
  const [isLoading, setIsLoadng] = useState<boolean>()
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)
  const [selectDatas, setSelectDatas] = useState<ISelectData[]>()

  const { isModalOpen, setIsModalOpen, reload, isUpdate, setIsUpdate, formRefData, id } = props
  const { facultyInfo, setFacultyInfo } = useModel('faculty')

  useEffect(() => {
    setIsModalOpen(isModalOpen)
    console.log('facultyInfo',facultyInfo);

    if (facultyInfo) {
      selectData()
    }
  }, [isModalOpen])

  useEffect(() => {
    setIsUpdate(isUpdate)
    if (isUpdate) {
      if (formRefData) {
        form.setFieldsValue({
          teacherName: formRefData.teacherName,
          faculty: formRefData.faculty,
          teacherPhone: formRefData.teacherPhone,
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
    setSelectDatas(data)
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
      const res = await teacherCreate(values)
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
      const res = await updateTeacher({ values, id,teacherPhone:formRefData.teacherPhone })
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
  return (
    <>
      <Modal
        open={isModalOpen}
        title={[
          <div key='1' className={styles.title}>
            <h2>新增教师</h2>
          </div>,
        ]}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 4, offset: 1 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          ref={formRef}
        >
          <Form.Item
            wrapperCol={{ offset: 1, span: 16 }}
            // labelCol={{ offset: 2 }}
            label='教师姓名'
            name='teacherName'
            rules={[{ required: true, message: '请输入教师姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 1, span: 16 }}
            // labelCol={{ offset: 3}}
            label='所属院系'
            name='faculty'
            rules={[{ required: true, message: '请输入院系' }]}
          >
            <Select style={{ width: '100%' }} options={selectDatas} />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 1, span: 16 }}
            // labelCol={{ offset: 2 }}
            label='教师手机号'
            name='teacherPhone'
            rules={phoneRules.phoneExtensionsData}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button className={styles.cancel} onClick={handleCancel}>
              取消
            </Button>
            {isUpdate ? (
              <Button
                loading={isUpdateLoading}
                type='primary'
                className={styles.submit}
                htmlType='submit'
              >
                修改
              </Button>
            ) : (
              <Button
                loading={isLoading}
                type='primary'
                className={styles.submit}
                htmlType='submit'
              >
                确认
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export { AddUserModal }
