import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import graphColors from '../assets/graphColors'
import Loader from 'react-loader-spinner'
class ActiveDataSeriesSidebar extends Component {

  handleCloseClick = (e) => {
    this.props.actions.removeActiveSeries(this.props.activeDataSeriesStore, e.target.id)
  }

  getBackgroundColor = () => {
    const { id } = this.props.series
    const { activeDataSeries } = this.props.activeDataSeriesStore
    let index
    activeDataSeries.filter(ser => ser.plotlyData).forEach((series, i) => {
      if (series.id === id) index = i
    })
    return { backgroundColor: graphColors[index] }
  }

  render() {

    let { series } = this.props
    let propertyInputString = ''
    Object.values(series.propertyInput).forEach((value, i)=>{
      propertyInputString += ` - ${value}`
    })

    return (
      <div className='active-data-series' >
        <div className='active-data-series-marker'>
          {series.requestInFlight ?
            <div className='active-data-series-spinner'>
              <Loader
                type="Oval"
                color="#fff"
                height="20"
                width="20"
              />
            </div>
            : <div
              className='active-data-series-line'
              style={this.getBackgroundColor()}
            />
          }
          <p>{series.property.name} {propertyInputString}</p>
        </div>

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
