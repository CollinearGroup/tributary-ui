import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import './Analysis.css'


class Analysis extends Component {
    render(){
      return (
        <div className='analysis-container'>
          <div className="card">
            <div className='analysis-card-title'>
              {this.props.activeDataSeriesStore.hoverData.length &&
                //show the date
                this.props.activeDataSeriesStore.hoverData[0].x
              }
            </div>
            {this.props.activeDataSeriesStore.hoverData.map(pt => {
              return <div key={pt.name+'_'+pt.x} className="analysis-card-series">
                <div className='analysis-card-series-name'>{pt.name}</div>
                <div className='analysis-card-value'>
                  {pt.y}
                </div>
              </div>
            })}
          </div>
        </div>
      )
    }
}

export default inject("actions", "activeDataSeriesStore")(observer(Analysis))