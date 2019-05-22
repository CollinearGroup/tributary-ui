import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import './Analysis.css'


class Analysis extends Component {

  clickCheckbox = (e) => {
    console.log(e.target)
    //this.props.actions.updateYaxis(this.props.activeDataSeriesStore, id, yaxis)
  }


    render(){
      let { activeDataSeries } = this.props.activeDataSeriesStore

      console.log(activeDataSeries)

      let dataList = activeDataSeries.filter(series => {
        return (series.plotlyData)
      }).map((series, i) => {
        let name = series.plotlyData.name
        let yaxis = series.plotlyData.yaxis
        return (
          <div className="yaxis-selection-data-list-item">
            <div className="yaxis-selection-big-header">
              {name}
            </div>
            <div className="yaxis-selection-small-header">
              <input 
                type="radio" 
                name={name} 
                value="y"
                checked={yaxis==="y"} />
            </div>
            <div className="yaxis-selection-small-header">
              <input 
                type="radio" 
                name={name} 
                value="y2"
                checked={yaxis==="y2"} />
            </div>
          </div>
          )
      })

      return (
        <div className='analysis-container'>
          <div className="yaxis-selection-container">
            <div className="yaxis-selection-header">
              <div className="yaxis-selection-big-header">Data List</div>
              <div className="yaxis-selection-small-header">Y-Axis 1</div>
              <div className="yaxis-selection-small-header">Y-Axis 2</div>
            </div>
            <div className="yaxis-selection-list-container">
              {dataList}
            </div>
          </div>
          {(this.props.activeDataSeriesStore.hoverData.length &&
          <div>
            <div className="card">
              <div className='analysis-card-title'>
                {this.props.activeDataSeriesStore.hoverData[0].x}
              </div>
              {this.props.activeDataSeriesStore.hoverData.map(pt => {
                return <div key={pt.name + '_' + pt.x} className="analysis-card-series">
                  <div className='analysis-card-series-name'>{pt.name}</div>
                  <div className='analysis-card-value'>
                    {pt.y}
                  </div>
                </div>
              })}
            </div>
          </div>
          ) || <p className='analysis-default-message'>No data selected</p>
          }
        </div>
      )
    }
}

export default inject("actions", "activeDataSeriesStore")(observer(Analysis))