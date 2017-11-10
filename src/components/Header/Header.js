import React from 'react'
import img_data from '../../images/4086-logo.png'
import './Header.scss'

export const Header = () => (
  <div>
    <div className="header-div">
      <img src={img_data} style={{height:'85px'}}/>
    </div>
  </div>
)

export default Header
