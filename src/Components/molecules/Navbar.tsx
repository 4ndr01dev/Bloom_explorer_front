import React from 'react'
import './navbar.scss'
import smallIcon from '../../assets/logo_small.svg'
// import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <header className="nav_bar_container">
        <figure className="figure">
          <img src={smallIcon} alt="" className="image" />
        </figure>
        <nav className="navList">
          <ul>
            <li>
              explorer
              {/* <Link to="/">Encoder decoder</Link> */}
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar
