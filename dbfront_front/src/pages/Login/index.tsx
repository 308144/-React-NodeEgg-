import { Button, Form, Input, message } from 'antd'
import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'

import { tokenStorage } from '@/common/localStorage'
import { useMemoizedFn } from '@/hooks'
import { ILoginParams } from '@/pages/Login/api/types'
// import { useModel } from '@/store'
import { userLogin } from './api'

/** 登录页面 */
const LogInPage: React.FC = () => {
  // const { setUserInfo } = useModel('user')
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
      // 保存user数据到local里
      const user = { name: data.userName, userId: data.userId }
      // console.log(`${data.token}`)

      // tokenStorage.setItem(`Bearer ${data.token}`)
      tokenStorage.setItem(`${data.token}`)
      // setUserInfo(user)
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

  /**
   *  正则存储
   *  @author coiner
   * * */
  // 手机号正则
  const Iphone_reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/

  // 手机号验证
  const phoneRules = {
    phoneExtensionsData: [
      {
        require: true,
        validator(_: any, value: string) {
          if (value === undefined || value === '' || !isNaN(Number(value)) === false) {
            return Promise.reject(new Error(`请输入手机号`))
          } else if (!Iphone_reg.test(value)) {
            return Promise.reject(new Error(`请输入正确手机号`))
          } else {
            return Promise.resolve()
          }
        },
      },
    ],
  }
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
