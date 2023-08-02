import { StableWebView } from '@/components/StableWebView'
import { useMemo } from 'react'
import { useSpaceCourseFailureQuery } from '@/swr/space/course/failure'
import { formatSemester } from '@/pages/space/@utils/utils'

export function CourseFailureRateQueryChart() {
  const { data } = useSpaceCourseFailureQuery()

  const html = useMemo(
    () => `
<html lang="zh-CN" style="height: 100%">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover">
</head>
<body style="height: 100%; margin: 0">
  <div id="container" style="height: 100%"></div>

  
  <script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.min.js"></script>
  <script type="text/javascript">
    var dom = document.getElementById('container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    
    var option;

    option = {
  xAxis: {
    type: 'category',
    data: [${data
      ?.map((item) => `'${formatSemester(item.semesterName)}'`)
      .reverse()
      .toString()}]
  },
  legend: {
      top: 'top', // 设置图例组件的位置在图表上方
      textStyle: {
        color: 'black' // 设置图例文本的颜色
      }
    },
  tooltip: {
    trigger: 'axis'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [${data
        ?.map((item) => (item.failRate * 100).toFixed(2))
        .reverse()
        .toString()}],
      type: 'line',
      smooth: true,
      name: '挂科率',
    }
  ]
};

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
  </script>
</body>
</html>
  `,
    [data]
  )

  return (
    <StableWebView
      source={{
        html,
      }}
    />
  )
}
