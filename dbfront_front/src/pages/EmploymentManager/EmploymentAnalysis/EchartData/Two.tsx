import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

function BarChart() {
  const chartRef = useRef(null)

  useEffect(() => {
    // 创建 ECharts 实例
    const chart = echarts.init(chartRef.current)

    // 配置图表
    const option = {
      series: [
        {
          title: {
            text: '就业企业的性质',
          },
          type: 'pie',
          data: [
            {
              value: 335,
              name: '国企企业',
            },
            {
              value: 234,
              name: '台资企业',
            },
            {
              value: 234,
              name: '政府机构',
            },
            {
              value: 234,
              name: '外资企业',
            },
            {
              value: 1548,
              name: '私有企业',
            },
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
