import { Button, Form, FormInstance, Input, message, Modal, Select, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { adminCreate, updateUser, uploadExcle } from '@/pages/UserManager/Modal/api'
import { CloudDownloadOutlined, FileDoneOutlined, UploadOutlined } from '@ant-design/icons'
import { selectFile } from '@/utils/tools'
interface IAddUserModal {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  reload: () => void
  isUpdate: boolean
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  formRefData: string
}
interface IBulkAddUserModalProps {
  bulkIsModalOpen: boolean
  reload: () => void

  setBulkIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddUserModal = (props: IAddUserModal) => {
  const formRef = React.useRef<FormInstance>(null)
  const [form] = Form.useForm()
  const [isLoading, setIsLoadng] = useState<boolean>()
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)
  const { isModalOpen, setIsModalOpen, reload, isUpdate, setIsUpdate, formRefData } = props
  useEffect(() => {
    setIsModalOpen(isModalOpen)
  }, [isModalOpen])
  useEffect(() => {
    setIsUpdate(isUpdate)
    console.log('formRefData', formRefData)
    if (formRefData) {
      form.setFieldsValue({
        userName: formRefData.userName,
        password: formRefData.password,
        identity: formRefData.identity,
      })
    }
  }, [isUpdate])

  // 弹窗关闭
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsUpdate(false)
    form.resetFields()
  }
  const onFinish = async values => {
    if (!isUpdate) {
      setIsLoadng(true)
      const res = await adminCreate(values)
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
      const res = await updateUser(values)
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
            <h2>添加用户</h2>
          </div>,
        ]}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          ref={formRef}
        >
          <Form.Item
            wrapperCol={{ offset: 1, span: 23 }}
            labelCol={{ offset: 2 }}
            label='账号'
            name='userName'
            rules={[{ required: true, message: '请输入账号' }]}
          >
            {/* <div className={styles.singleLogout}>
              注销后，该兑换码将无法进行兑换。若已经兑换，则该权益将同步注销。
            </div> */}
            <Input disabled={isUpdate} />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 1, span: 23 }}
            labelCol={{ offset: 2 }}
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 1, span: 23 }}
            labelCol={{ offset: 2 }}
            label='身份'
            name='identity'
            rules={[{ required: true, message: '请选择身份' }]}
          >
            <Select
              style={{ width: '100%' }}
              options={[
                { value: 'student', label: '学生' },
                { value: 'manager', label: '管理员' },
              ]}
            />
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
// 批量注销
const BulkAddUserModal: React.FC<IBulkAddUserModalProps> = props => {
  const { bulkIsModalOpen, reload, setBulkIsModalOpen } = props
  const [importFile, setImportFile] = useState<File>(null)
  const [importLoading, setImportLoading] = useState(false)
  useEffect(() => {
    setBulkIsModalOpen(bulkIsModalOpen)
  }, [bulkIsModalOpen])

  // 弹窗关闭
  const handleCancel = () => {
    setBulkIsModalOpen(false)
    setImportFile(null)
  }

  // 弹窗提交
  const onImportSubmit = () => {
    if (!importFile) return message.warning('请先上传文件')
    if (importLoading) return message.warning('请等待上传完毕后在上传文件')
    const content = `确认批量注销【${importFile.name}】吗?`
    const modal = Modal.confirm({
      title: '提示',
      content,
      async onOk() {
        modal.destroy()
        setImportLoading(true)
        const formData = new FormData()
        formData.append('file', importFile)
        const res = await uploadExcle(formData)
        if (res.code === 0) {
          message.success(res.msg)
          setBulkIsModalOpen(false)
          setImportFile(null)
          reload()
        } else {
          notification.error({
            message: '出现错误',
            description: res.msg,
          })
        }
        setImportLoading(false)
      },
      onCancel() {
        modal.destroy()
      },
    })
  }
  // 上传文件时候不是xlsx文件的弹窗
  const notXlsx = () => {
    if (importFile?.name) {
      notification.error({
        message: '文件类型错误',
        description: '请上传文件后缀为.xlsx文件，您可以下载我们提供的Excel模板文件，进修改后上传',
      })
      return ' 请上传文件'
    } else {
      return ' 请上传文件'
    }
  }

  // 下载excle文件
  const downBulkLogoutExcel = () => {
    location.href =
      'https://dbfront-firstbucket.oss-cn-chengdu.aliyuncs.com/%E6%89%B9%E9%87%8F%E6%A8%A1%E6%9D%BF.xlsx'
  }
  return (
    <>
      <Modal
        destroyOnClose
        title={[
          <div key='1' className={styles.title}>
            <h2>批量新增用户信息</h2>
          </div>,
        ]}
        open={bulkIsModalOpen}
        onCancel={handleCancel}
        footer={[
          <div key='1' className={styles.footer}>
            <Button className={styles.cancel} key='cancel' onClick={handleCancel}>
              取消
            </Button>

            {importFile?.name.split('.')[importFile?.name.split('.').length - 1] === 'xlsx' ? (
              <Button
                type='primary'
                className={styles.submit}
                key='ok'
                onClick={onImportSubmit}
                loading={importLoading}
              >
                提交
              </Button>
            ) : (
              <Button className={styles.disBtn} type='primary' key='ok' disabled>
                提交
              </Button>
            )}
          </div>,
        ]}
      >
        <div className={styles.faDocu}>
          <div className={styles.document}>请上传文件</div>
          <Button
            icon={importFile ? <FileDoneOutlined /> : <UploadOutlined />}
            type='primary'
            onClick={() => selectFile('xlsx', setImportFile)}
          >
            {importFile?.name.split('.')[importFile?.name.split('.').length - 1] === 'xlsx'
              ? decodeURIComponent(importFile.name)
              : notXlsx()}
          </Button>
        </div>

        <br />
        <Button
          className={styles.tips}
          icon={<CloudDownloadOutlined />}
          type='link'
          onClick={downBulkLogoutExcel}
        >
          下载Excel模板
        </Button>
      </Modal>
    </>
  )
}

export { AddUserModal, BulkAddUserModal }
