import {
  ApexCharts,
  type ApexAxisChartSeries,
  type ApexChartsInstance,
} from '@/components/apexcharts'
import { useAppSelector } from '@/store/store'
import { floatFixed } from '@/shared/utils/utils'
import { useEffect, useMemo, useRef } from 'react'
import { formatSemester } from '@/pages/space/@utils/utils'
import { useTheme } from 'react-native-paper'
import { StableWebView } from '@/components/StableWebView'
import { useSpaceCourseFailureQuery } from '@/swr/space/course/failure'

const injectedCSS = `
div.apexcharts-toolbar {
  display: none;
}
`

const getOptions = (series: ApexAxisChartSeries[], categories: string[]) => `
{
  chart: {
    type: 'line',
  },
  series: ${JSON.stringify(series)},
  xaxis: {
    categories: ${JSON.stringify(categories)},
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      with: 12,
      height: 8,
    },
  },
  stroke: {
    width: 3,
  },
}
`

const seriesMap: { key: keyof RankInfo; name: string }[] = [
  { key: 'mine', name: '我的' },
  { key: 'avg', name: '平均' },
  { key: 'head', name: '前10%' },
  { key: 'max', name: '最高' },
]

const useChart = () => {
  const { semesters, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const series = useMemo<ApexAxisChartSeries[]>(() => {
    const getSeriesData = (key: keyof RankInfo) =>
      semesters
        .map((semester) => {
          const rankData =
            rankType === 'compulsory'
              ? semester.compulsoryRank
              : semester.totalRank
          const scoreData =
            scoreType === 'score' ? rankData.score : rankData.gpa
          return floatFixed(scoreData[key])
        })
        .reverse()

    return seriesMap.map((item) => ({
      name: item.name,
      data: getSeriesData(item.key),
    }))
  }, [rankType, scoreType, semesters])

  const categories = useMemo(
    () => semesters.map((item) => formatSemester(item.semester)).reverse(),
    [semesters]
  )

  return {
    series,
    categories,
  }
}

export const SemesterScoreChart = () => {
  const { semesters, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const html = useMemo(
    () => `
<html lang="zh-CN" style="height: 100%">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover">
</head>
<body style="height: 100%; margin: 0">
  <div id="container" style="height: 100%; width: 100%;"></div>

  
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
    data: [${semesters
      .map((item) => `'${formatSemester(item.semester)}'`)
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
    type: 'value',
    min: Math.min(${semesters
      .map((item) => {
        const { mine, max, head, avg } = item.compulsoryRank.score

        return Math.min(mine, max, head, avg).toFixed(0)
      })
      .reverse()
      .join(',')}, 100),
    max: Math.max(${semesters
      .map((item) => item.compulsoryRank.score.max.toFixed(0))
      .reverse()
      .join(',')}, 0)
  },
  
  series: [
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.mine.toFixed(0))
        .reverse()
        .toString()}],
      type: 'line',
      name: '我的',
      areaStyle: {
        opacity: 0.3
      },
    },
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.avg.toFixed(2))
        .reverse()
        .toString()}],
      type: 'line',
      name: '平均',
    },
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.head.toFixed(2))
        .reverse()
        .toString()}],
      type: 'line',
      name: '前10%',
    },
    {
      data: [${semesters
        .map((item) => item.compulsoryRank.score.max.toFixed(0))
        .reverse()
        .toString()}],
      type: 'line',
      name: '最高',
    },
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
    []
  )

  return (
    <StableWebView
      source={{
        html,
      }}
    />
  )
}
