import React, { Component } from 'react'
import './Nav.css'
import collinearLogo from '../assets/CollinearDataLogo.png'
export default class Nav extends Component {

  handleContact = (e) => {
    let page = e.target.getAttribute('value')
    this.props.handleContactClick(page)
  }

  render() {
    return (
      <div>
        <div className='nav-container'>
          <a
            target='_blank'
            rel="noopener noreferrer"
            href='https://www.collineargroup.com/'
          >
            <img src={collinearLogo} alt='logo' className='nav-collinear-logo' />
          </a>
          <div
            className="nav-item"
            value={"main"}
            onClick={this.handleContact}
          >
            Tributary
          </div>
          <div
            className="nav-item"
            value={"contact"}
            onClick={this.handleContact}
          >
            CONTACT
          </div>
        </div>
      </div>
    )
  }
}