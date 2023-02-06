import { Button, Form, FormInstance, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { facultyCreate, updateFaculty } from '@/pages/Faculty/Modal/api'
import { useModel } from '@/store'
import { getFacultyData } from '@/api'

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
  const formRef = React.useRef<FormInstance>(null)
  const [form] = Form.useForm()
  const [isLoading, setIsLoadng] = useState<boolean>()
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)

  const { isModalOpen, setIsModalOpen, reload, isUpdate, setIsUpdate, formRefData, id } = props
  const { setFacultyInfo } = useModel('faculty')

  useEffect(() => {
    setIsModalOpen(isModalOpen)
  }, [isModalOpen])

  useEffect(() => {
    setIsUpdate(isUpdate)
    if (isUpdate) {
      if (formRefData) {
        form.setFieldsValue({
          faculty: formRefData.faculty,
        })
      }
    }
  }, [isUpdate])

  // 弹窗关闭
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
    setIsUpdate(false)
  }
  // 获取当前的院系人员
  const getFaculty = async () => {
    const res = await getFacultyData()
    if (res.code === 0) {
      setFacultyInfo(res.data.records.map(item => item.faculty))
    }
  }
  // 修改或新增按钮
  const onFinish = async values => {
    if (!isUpdate) {
      // 确定逻辑
      setIsLoadng(true)
      const res = await facultyCreate(values)
      if (res.code === 0) {
        getFaculty()
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
      // 修改逻辑
      setIsUpdateLoading(true)
      const res = await updateFaculty({ values, id ,original:formRefData.faculty})
      if (res.code === 0) {
        getFaculty()
        setIsUpdateLoading(false)
        setIsModalOpen(false)
        setIsUpdate(false)
        form.resetFields()
        reload()
        message.success(res.msg)
      } else {
        message.error(res.msg)
        setIsUpdateLoading(false)
      }
    }
  }
  return (
    <>
      <Modal
        open={isModalOpen}
        title={[
          <div key='1' className={styles.title}>
            <h2>新增院系</h2>
          </div>,
        ]}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          ref={formRef}
        >
          <Form.Item
            wrapperCol={{ offset: 1, span: 16 }}
            labelCol={{ offset: 2 }}
            label='院系'
            name='faculty'
            rules={[{ required: true, message: '请输入院系' }]}
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
