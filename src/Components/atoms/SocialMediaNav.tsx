import React from 'react'
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import './SocialMediaNav.scss'

interface SocialMediaLinks {
  github?: string
  twitter?: string
  instagram?: string
  linkedIn?: string
}

const SocialMediaNav: React.FC<SocialMediaLinks> = ({
  github,
  twitter,
  instagram,
  linkedIn,
}) => {
  return (
    <div className="social-media-icons">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      )}
      {linkedIn && (
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      )}
    </div>
  )
}

export default SocialMediaNav
