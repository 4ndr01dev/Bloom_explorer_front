import React from 'react'
import { Bar } from 'react-chartjs-2'
import type { ChartData } from 'chart.js'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: ChartData<'bar'>
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return <Bar data={data} />
}

export default BarChart
