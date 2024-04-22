import React from 'react'
import { Line } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

interface BarChartProps {
  data: ChartData<'line'>
  maxTicksLimit?: number
}

const LineChart: React.FC<BarChartProps> = ({ data, maxTicksLimit }) => {
  console.log({ maxTicksLimit })
  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',
          maxRotation: 90,
          autoSkip: true,
          maxTicksLimit: 50,
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF', 
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  }
  return <Line data={data} options={options} height={'250%'} />
}

export default LineChart
