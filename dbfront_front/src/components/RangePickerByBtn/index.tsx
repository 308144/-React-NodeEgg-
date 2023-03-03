/* eslint-disable react/prop-types */
/* 可以指定今天、昨天、近7天、近30天的 RangePicker */

import { Space, Button, DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'

import { timeToMomentObj } from '@/utils/tools'

const { RangePicker } = DatePicker

/* 获取 今天、昨天、近7天、近30天时间段 */
const getTimeRange = (type: string) => {
  let timeRange: any = [null, null]
  const timeStamp = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
  // 今天
  const todayTimeStart = timeStamp
  const todayTimeEnd = timeStamp + 24 * 60 * 60 * 1000 - 1000
  // 昨天
  const yesDayTimeStart = timeStamp - 24 * 60 * 60 * 1000
  const yesDayTimeEnd = timeStamp - 1000
  // 近7天
  const sevenDaysTimeStart = timeStamp - 6 * 24 * 60 * 60 * 1000
  const sevenDaysTimeEnd = timeStamp + 24 * 60 * 60 * 1000 - 1000
  // 近30天
  const thirtyDaysTimeStart = timeStamp - 29 * 24 * 60 * 60 * 1000
  const thirtyDaysTimeEnd = timeStamp + 24 * 60 * 60 * 1000 - 1000
  // 转换时间格式 显示成antd 支持的格式时间

  switch (type) {
    case 'today':
      timeRange = [timeToMomentObj(todayTimeStart), timeToMomentObj(todayTimeEnd)]
      break
    case 'yesterday':
      timeRange = [timeToMomentObj(yesDayTimeStart), timeToMomentObj(yesDayTimeEnd)]
      break
    case 'seven':
      timeRange = [timeToMomentObj(sevenDaysTimeStart), timeToMomentObj(sevenDaysTimeEnd)]
      break
    case 'thirty':
      timeRange = [timeToMomentObj(thirtyDaysTimeStart), timeToMomentObj(thirtyDaysTimeEnd)]
      break
    default:
      timeRange = [timeToMomentObj(sevenDaysTimeStart), timeToMomentObj(sevenDaysTimeEnd)]
      break
  }

  return timeRange
}

const RangePickerByBtn: React.FC<any> = ({ config, form, field, mode = 'minute' }) => {
  const footerNode = (
    <Space>
      <Button
        onClick={() => {
          const timeRange = getTimeRange('today')

          form.setFieldsValue({
            [`${field}`]: timeRange,
          })
        }}
      >
        今
      </Button>
      <Button
        onClick={() => {
          const timeRange = getTimeRange('yesterday')

          form.setFieldsValue({
            [`${field}`]: timeRange,
          })
        }}
      >
        昨
      </Button>
      <Button
        onClick={() => {
          const timeRange = getTimeRange('seven')

          form.setFieldsValue({
            [`${field}`]: timeRange,
          })
        }}
      >
        近7天
      </Button>
      <Button
        onClick={() => {
          const timeRange = getTimeRange('thirty')

          form.setFieldsValue({
            [`${field}`]: timeRange,
          })
        }}
      >
        近30天
      </Button>
    </Space>
  )
  let showFormat = 'YYYY-MM-DD HH:mm'
  if (mode === 'day') {
    showFormat = 'YYYY-MM-DD'
  }

  return (
    <RangePicker
      // {...config}
      showTime={{
        format: 'HH:mm',
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
      }}
      format={showFormat}
      renderExtraFooter={() => footerNode}
      placeholder={['开始时间', '结束时间']}
    />
  )
}

export default RangePickerByBtn
