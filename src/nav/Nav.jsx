import React, { Component } from 'react'
import './Nav.css'
import collinearLogo from '../assets/CollinearDataLogo.png'
export default class Nav extends Component {

  render() {
    return (
    <div>
      <div className='nav-container'>
      <img src={collinearLogo} alt='logo' className='nav-collinear-logo' />
        Tributary
      </div>
     </div> 
    )
  }
}