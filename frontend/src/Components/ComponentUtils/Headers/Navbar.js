import React from 'react'

import '../Css/Navbar.css'

import logo from '../../../Images/logo.png'

function Navbar() {
  return (
    <header>
      <div className='logo'>
        <a className='logo' href='/'>
          <img src={logo} className='imageNav' alt='Logo' />
          <p className='logo'>Fluffy Share</p>
        </a>
      </div>
      <nav>
        <ul className='nav__links'>
          <li>
            <a href='https://fluffyv.com' target="_blank">Webseite</a>
          </li>
          <li>
            <a href='https://discord.gg/fluffyv' target="_blank">Discord</a>
          </li>
        </ul>
      </nav>
      <a className='cta' href='/'>
        Upload
      </a>
    </header>
  )
}

export default Navbar
