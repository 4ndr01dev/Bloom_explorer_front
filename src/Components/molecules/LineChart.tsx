import React from 'react'
import { Line } from 'react-chartjs-2'
import type { ChartData } from 'chart.js'

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
}

const LineChart: React.FC<BarChartProps> = ({ data }) => {
  return <Line data={data} />
}

export default LineChart
