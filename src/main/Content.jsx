import React, { Component } from 'react'
import './Content.css'
import './Graph.css'
import Graph from './Graph.jsx'
import { observable, decorate, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import AddDataSourceContent from './AddDataSourceContent';
import { Splash } from './Splash'

class Content extends Component {

  renderContent = () => {

    let { activeDataSeries } = this.props.activeDataSeriesStore
    if(!activeDataSeries.length) return <Splash />

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
  activeDataSeriesStore: observer,
  handleGraphUpdate: action
})


export default inject("actions", "appStateStore", "activeDataSeriesStore")(observer(Content))