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
        text: '就业比例',
      },
      // dataset: { source: [['product', '2015', '2016', '2017']] },
      xAxis: {
        data: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [5000, 6000, 8000, 7500, 7602, 7500, 6504],
        },
        {
          type: 'bar',
          data: [4000, 5200, 7020, 6300, 6000, 7000, 6000],
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
