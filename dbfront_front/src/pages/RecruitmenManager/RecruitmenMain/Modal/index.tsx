import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Row,
  Select,
} from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'

import {
  recruitmenCreate,
  updateRecruitmen,
} from '@/pages/RecruitmenManager/RecruitmenMain/Modal/api'

import { useModel } from '@/store'
import { getFacultyData } from '@/api'
// import { phoneRules } from '@/utils/tools'
import TextArea from 'antd/lib/input/TextArea'
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
    if (facultyInfo) {
      selectData()
    }
  }, [isModalOpen])

  useEffect(() => {
    setIsUpdate(isUpdate)
    if (isUpdate) {
      if (formRefData) {
        form.setFieldsValue({
          enterpriseSize: formRefData.enterpriseSize,
          recruitmentSubject: formRefData.recruitmentSubject,
          // releaseDate: formRefData.releaseDate,
          recruitmentPost: formRefData.recruitmentPost,
          Industry: formRefData.Industry,
          placeWork: formRefData.placeWork,
          businessMailbox: formRefData.businessMailbox,
          recruiterPhone: formRefData.recruiterPhone,
          recruiterPersonCount: formRefData.recruiterPersonCount,
          status: formRefData.status,
        })
      }
    }
  }, [isUpdate])
  useEffect(() => {
    getFaculty()
  }, [])
  // ????????????????????????
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

  // ????????????
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
    setIsUpdate(false)
  }

  // ?????????????????????
  const onFinish = async values => {
    if (!isUpdate) {
      setIsLoadng(true)
      //  const releaseDate = values.releaseDate.splice(0, 11)
      //   delete values.releaseDate
      //   values[releaseDate]=releaseDate
      const res = await recruitmenCreate(values)
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
      const res = await updateRecruitmen({ values, id })
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

  // ????????????
  const getFields = () => (
    <>
      <Col span={12} key={1}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='recruitmentSubject'
          label='????????????'
          rules={[
            {
              required: true,
              message: '?????????????????????',
            },
          ]}
        >
          <TextArea placeholder='?????????????????????' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={3}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='recruitmentPost'
          label='????????????'
          rules={[
            {
              required: true,
              message: '?????????????????????',
            },
          ]}
        >
          <TextArea placeholder='?????????????????????' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={4}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='enterpriseSize'
          label='????????????'
          rules={[
            {
              required: true,
              message: '?????????????????????',
            },
          ]}
        >
          <TextArea placeholder='?????????????????????' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={5}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='Industry'
          label='????????????'
          rules={[
            {
              required: true,
              message: '?????????????????????',
            },
          ]}
        >
          <TextArea placeholder='?????????????????????' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={6}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='placeWork'
          label='????????????'
          rules={[
            {
              required: true,
              message: '?????????????????????',
            },
          ]}
        >
          <TextArea placeholder='?????????????????????' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={7}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='businessMailbox'
          label='????????????'
          rules={phoneRules.emailExtensionsData}
        >
          <TextArea placeholder='?????????????????????' autoSize />
        </Form.Item>
      </Col>

      <Col span={12} key={8}>
        <Form.Item
          labelCol={{ span: 6, offset: 1 }}
          wrapperCol={{ span: 18, offset: 1 }}
          name='recruiterPersonCount'
          label='????????????'
          rules={[
            {
              required: true,
              message: '?????????????????????',
            },
          ]}
        >
          <TextArea placeholder='?????????????????????' autoSize />
        </Form.Item>
      </Col>
      <Col span={12} key={9}>
        <Form.Item
          labelCol={{ span: 8, offset: 1 }}
          wrapperCol={{ span: 16, offset: 1 }}
          name='recruiterPhone'
          label='???????????????'
          rules={phoneRules.phoneExtensionsData}
        >
          <TextArea placeholder='????????????????????????' autoSize />
        </Form.Item>
      </Col>

      <Col span={8} key={10}>
        <Form.Item
          labelCol={{ span: 9, offset: 1 }}
          wrapperCol={{ span: 13, offset: 3 }}
          name='status'
          label='????????????'
          rules={[
            {
              required: true,
              message: '?????????????????????',
            },
          ]}
        >
          <Select
            placeholder='?????????????????????'
            style={{ width: '210px' }}
            options={[
              { value: '0', label: '??????' },
              { value: '1', label: '?????????' },
            ]}
          ></Select>
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
            <h2>??????????????????</h2>
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
                  ??????
                </Button>
              ) : (
                <Button
                  type='primary'
                  style={{ width: '150px' }}
                  htmlType='submit'
                  loading={isUpdateLoading}
                >
                  ??????
                </Button>
              )}

              <Button
                style={{ margin: '0 8px', width: '150px' }}
                onClick={() => {
                  form.resetFields()
                }}
              >
                ??????
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export { AddUserModal }
