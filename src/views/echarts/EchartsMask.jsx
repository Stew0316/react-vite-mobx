import { useEffect, useRef } from "react"
import * as echarts from "echarts"
function EchartsMask() {
  let ctx = null
  let chart = null
  const ctx_width = window.innerWidth - 200
  const height = window.innerHeight - 60 - 1
  const canvasStyle = {
    width: `${ctx_width}px`,
    height: `${height}px`,
    display: 'block',
    background: 'transparent'
  }
  const domRef = useRef()
  function init() {
    chart = echarts.init(domRef.current);
    chart.setOption({
      title: {
        text: 'ECharts'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  }
  useEffect(() => {
    ctx = domRef.current.getContext('2d')
    init()
  })
  return (
    <>
      <canvas style={canvasStyle} ref={domRef} width={ctx_width} height={height}></canvas>
    </>
  )
}
export default EchartsMask