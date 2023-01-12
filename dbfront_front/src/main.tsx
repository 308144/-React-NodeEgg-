import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import App from '@/App'
import { StoreProvider } from '@/store'
import 'moment/dist/locale/zh-cn'

import '@/assets/css/reset.less'

moment.locale('zh-cn')

render(
  <ConfigProvider locale={zh_CN}>
    <StoreProvider>
      <Router basename='/'>
        <App />
      </Router>
    </StoreProvider>
  </ConfigProvider>,
  document.querySelector('#root'),
)
