# 就业学员管理系统项目汇总

## 登录逻辑

1、前端登录

2、后端查询数据库校验是否存在，如果存在，使用jwt生成保存改用户账号密码的token，并设置cookie

3、前端每次请求时自动携带cookie

4、后端使用中件，除了login和logout不检测，其余所有接口都要走中间件进行校验，从请求头中获取cookie，并解析token，使用jwt解析出保密信息，然后进行数据库查询，看是否有这个用户，进行逻辑校验

**注意一定不要在后端设置cookie时加上httpOnly: true,否则前端没办法去获取cookie的；**

5、前端axios进行拦截，如果有403，401，则直接返回登录页，并清除localStroage，cookie

## Axios封装请求

逻辑，创建axios对象，设置请求、响应拦截

```tsx
import { notification } from 'antd'
import axios from 'axios'

import { tokenStorage } from '@/common/localStorage'

const service = axios.create({
  timeout: 10000,
  withCredentials: true,
})

service.interceptors.request.use(
  config => {
    console.log('res_config', config)
    return config
  },
  error => {
    console.log('error_req')
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    console.log('response', response.data)
    return response.data
  },
  err => {
    const { response } = err

    if (response && response.status) {
      if (response.status === 401) {
        window.location.href = '/#/login'
        notification.error({
          message: '无访问权限',
          description: '请重新登录，没有携带cookie',
        })
        tokenStorage.removeItem('dbfrontToken')
        window.setCookie('token', '', -1)
      } else if (response.status === 403) {
        window.location.href = '/#/login'
        notification.error({
          message: 'Token失效',
          description: 'token过期或token不匹配，请重新登录',
        })
        tokenStorage.removeItem('dbfrontToken')
        window.setCookie('token', '', -1)
      }
    } else {
      // 服务器连结果都没有返回
      if (!window.navigator.onLine) {
        // 断网处理：跳转断网页面/提示网络错误等等
        return
      }
      return Promise.reject(err)
    }
  },
)

export default service

使用// 回显数据
export const echoOneInformationData = phone => {
  return service({ url: `/nodeServe/echoOneInformationData/${phone}`, method: 'get' })
}


```

## APP组件

实时监控路由变化，如果路由变化时，本地没有cookie与localStorage，就会跳转到登录页面；

```tsx
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layouts from '@/layouts'
import { tokenStorage } from '@/common/localStorage'


const App = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  /** 初始化重定向 */
  const init = () => {
    console.log(tokenStorage.getItem())
    if (tokenStorage.getItem()) {
      if (pathname === '/') navigate('/home')
    } else if (pathname !== '/login') {
      navigate('/login')
    }
  }
  useEffect(init, [pathname])

  return <Layouts />
}

export default App

```

## localStorage.ts

封装一个class，可以在当前ts文件看到所有的localStorage设置，方便进行管理；

当获取到数据的时候，就会把当前的token放到loaclStorage里面。在退出的时候把当前的localStorage的token去掉；

```
export const localStorageKey = 'com.dbfront'

interface ISessionStorage<T> {
  key: string
  defaultValue: T
}

export class SessionStorage<T> implements ISessionStorage<T> {
  key: string
  defaultValue: T

  constructor(key, defaultValue) {
    this.key = localStorageKey + key
    this.defaultValue = defaultValue
  }

  setItem(value: T) {
    localStorage.setItem(this.key, window.btoa(encodeURIComponent(JSON.stringify(value))))
  }

  removeItem() {
    localStorage.removeItem(this.key)
  }

  getItem(): T {
    const value =
      localStorage[this.key] && decodeURIComponent(window.atob(localStorage.getItem(this.key)))
    if (value === undefined) return this.defaultValue
    try {
      return value && value !== 'null' && value !== 'undefined'
        ? (JSON.parse(value) as T)
        : this.defaultValue
    } catch (error) {
      return value && value !== 'null' && value !== 'undefined'
        ? (value as unknown as T)
        : this.defaultValue
    }
  }
}

export const tokenStorage = new SessionStorage<string>('Token', '')
// 清除当前项目的本地存储
export const clearLocalStorage = () => {
  for (const key in localStorage) {
    if (key.includes(localStorageKey)) {
      localStorage.removeItem(key)
    }
  }
}

```

