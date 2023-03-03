import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

function LineChart() {
  const chartRef = useRef(null)

  useEffect(() => {
    // 创建 ECharts 实例
    const chart = echarts.init(chartRef.current)

    // 配置图表
    const option = {
      title: {
        text: '2016-2022就业率',
      },
      tooltip: {},
      xAxis: {
        data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      },
      yAxis: {},
      series: [
        {
          name: '就业率',
          type: 'line',
          data: [5000, 6500, 5500, 4300, 5200, 4520, 5300],
        },
      ],
    }

    // 渲染图表
    chart.setOption(option)

    // 在组件卸载时销毁实例
    return () => {
      chart.dispose()
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
}

export default LineChart
