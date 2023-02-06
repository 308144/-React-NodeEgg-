import { Button, Form, Input, message } from 'antd'
import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'

import { tokenStorage,userStorage } from '@/common/localStorage'
import { useMemoizedFn } from '@/hooks'
import { ILoginParams } from '@/pages/Login/api/types'
// import { useModel } from '@/store'
import { userLogin } from './api'
import { useModel } from '@/store'
import {phoneRules} from '@/utils/tools'
/** 登录页面 */
const LogInPage: React.FC = () => {
  const { setUserInfo } = useModel('user')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  // 重置按钮
  const onReset = () => {
    form.resetFields()
  }
  // 完成
  const onFinish = useMemoizedFn(async (values: ILoginParams) => {
    const res = await userLogin(values)
    const { data } = res.data
    if (res.data.code === 0) {
     const userData=JSON.stringify(res.data.data)
      userStorage.setItem(userData)
      setUserInfo(res.data.data)
      tokenStorage.setItem(`${data.token}`)
      navigate('/home')
      message.success('登录成功')
    } else {
      message.error(res.data.msg)
    }
  })

  /** 清除上次登录时保存的状态 */
  useLayoutEffect(() => {
    if (tokenStorage.getItem()) {
      // clearLocalStorage()
      // window.location.reload()
    }
  }, [])


  return (
    <div className={styles.box}>
      <div className={styles.child}>
        <h1>高校就业管理系统</h1>
        <Form
          form={form}
          name='basic'
          wrapperCol={{ offset: 1, span: 15 }}
          labelCol={{ offset: 1, span: 4 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item label='手机号' name='userName' rules={phoneRules.phoneExtensionsData}>
            <Input placeholder='请输入手机号' />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password placeholder='请输入密码' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
            <Button onClick={onReset} className={styles.resit}>
              重置
            </Button>
            <Button type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LogInPage
