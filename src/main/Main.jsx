import React, { Component } from 'react'
import './Main.css'
import Sidebar from './Sidebar'
import Content from './Content'
export default class Main extends Component {

  render() {
    return (
    <div className='main-container'> 
      <Sidebar />
      <Content/>
     </div>
    )
  }
}