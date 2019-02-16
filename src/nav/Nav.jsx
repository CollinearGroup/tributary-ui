import React, { Component } from 'react'
import './Nav.css'
import collinearLogo from '../assets/CollinearDataLogo.png'
import tributaryLogo from '../assets/tributary-logo.svg'

// import {Link} from 'react-router'
export default class Nav extends Component {

  handleContact = (e) => {
    let page = e.target.getAttribute('value')
    this.props.handleContactClick(page)
  }

  render() {
    return (
      <div>
        <div className='nav-container'>
            <img src={tributaryLogo} alt='logo' className='nav-collinear-logo' />
        </div>
      </div>
    )
  }
}