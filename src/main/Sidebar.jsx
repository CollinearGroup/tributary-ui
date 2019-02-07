import React, { Component } from 'react'
import './Sidebar.css'
import DataSource from './components/DataSource';
import { observer, inject } from 'mobx-react'

class Sidebar extends Component {

  render() {
    let { dataSources } = this.props.catalogStore
    return <div className='sidebar-container'>
      Sidebar
      {dataSources.map(source => {
        return <DataSource key={source._id} source={source} />
      })}
      <button onClick={() => this.props.actions.addLocalDataSource(this.props.catalogStore, {name:`Cool Beans ${Date.now()}`, _id:Date.now() , url:"www.test.com"})}> Add Data Source</button>
    </div>
  }
}

export default inject("actions", "catalogStore")(observer(Sidebar))