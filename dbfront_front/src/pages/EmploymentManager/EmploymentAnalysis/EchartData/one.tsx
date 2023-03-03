import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

function BarChart() {
  const chartRef = useRef(null)

  useEffect(() => {
    // 创建 ECharts 实例
    const chart = echarts.init(chartRef.current)

    // 配置图表
    const option = {
      title: {
        text: '就也城市统计人均薪资',
      },
      // dataset: { source: [['product', '2015', '2016', '2017']] },
      xAxis: {
        data: [
          '山东',
          '台湾',
          '河南',
          '湖南',
          '湖北',
          '黑龙江',
          '贵州',
          '新疆',
          '江苏',
          '西藏',
          '甘肃',
          '香港',
          '北京',
          '上海',
        ],
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [
            8000, 8500, 9000, 9215, 7875, 7561, 5656, 5656, 7875, 7561, 9215, 10000, 11000, 10000,
          ],
        },
        {
          type: 'bar',
          data: [
            7875, 9000, 9215, 7875, 7561, 7561, 5656, 7875, 9215, 7561, 7561, 12000, 16000, 12000,
          ],
        },
        {
          type: 'bar',
          data: [
            5645, 8000, 9000, 9215, 7875, 7561, 5656, 5656, 7875, 7561, 9215, 14000, 15000, 13000,
          ],
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

export default BarChart
