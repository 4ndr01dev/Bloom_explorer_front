import React from 'react'
import './navbar.scss'
import smallIcon from '../../assets/logo_small_clear.svg'
import smallBloomIcon from '../../assets/bloom_logo_small_clear.svg'
import SocialMediaNav from '../atoms/SocialMediaNav'
// import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <header className="nav_bar_container">
        <section className="logo_section">
          <figure className="figure">
            <img src={smallIcon} alt="" className="image" />
          </figure>
          <p>X</p>
          <figure className="figure">
            <img src={smallBloomIcon} alt="" className="image" />
          </figure>
        </section>
        <aside>
          <SocialMediaNav
            github="https://github.com/4ndr01dev"
            linkedIn="https://www.linkedin.com/in/alvaroandroidev/"
          />
        </aside>
      </header>
    </>
  )
}

export default Navbar
