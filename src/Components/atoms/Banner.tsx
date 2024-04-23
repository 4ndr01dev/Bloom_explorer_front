import React from 'react'
import './Banner.scss'

import { FiInfo, FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi'

type BannerType = 'info' | 'warning' | 'error' | 'success'

interface BannerProps {
  message: string
  type: BannerType
}

const Banner: React.FC<BannerProps> = ({ message, type }) => {
  const getIcon = (type: BannerType) => {
    switch (type) {
      case 'info':
        return <FiInfo size={24} />
      case 'warning':
        return <FiAlertCircle size={24} />
      case 'error':
        return <FiXCircle size={24} />
      case 'success':
        return <FiCheckCircle size={24} />
      default:
        return null
    }
  }
  return (
    <div className={`banner banner-${type}`}>
      {getIcon(type)}
      <span style={{ marginLeft: '10px' }}>{message}</span>
    </div>
  )
}
export default Banner
