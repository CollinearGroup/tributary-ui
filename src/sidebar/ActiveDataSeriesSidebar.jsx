import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class ActiveDataSeriesSidebar extends Component {

  handleCloseClick=(e) =>{
    this.props.actions.removeActiveSeries( this.props.activeDataSeriesStore, e.target.id)
  } 

  render() {

    let { series } = this.props
    return (
      <div className='active-data-series'>
        <p>{series.property.key}-{series.propertyInput}</p>
        <i 
          className="material-icons close-icon"
          id={series.id}
          onClick={this.handleCloseClick}
          >
          close
        </i>
      </div>)

  }
}

export default inject("actions", "activeDataSeriesStore")(observer(ActiveDataSeriesSidebar))
