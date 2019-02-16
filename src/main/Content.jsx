import React, { Component } from 'react'
import './Content.css'
import './Graph.css'
import Graph from './Graph.jsx'
import { observable, decorate, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import AddDataSourceContent from './AddDataSourceContent';

class Content extends Component {

  renderContent = () => {
    switch (this.props.appStateStore.contentState) {
      case 'addDataSource':
        return <AddDataSourceContent />
      default:
        return <Graph />
    }
  }

  render() {

    return (
      <div className='content-container'>
        {this.renderContent()}
      </div>
    )
  }
}

decorate(Content, {
  contentState: observable,
  handleGraphUpdate: action
})


export default inject("actions", "appStateStore")(observer(Content))