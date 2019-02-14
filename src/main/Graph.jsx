import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import './Content.css'
import './Graph.css'
import graphColors from '../assets/graphColors'
import { observable, decorate, action } from 'mobx'
import { observer, inject } from 'mobx-react'

class Graph extends Component {
  // @observable
  plotState = {
    layout: {
      colorway: graphColors,
      autosize: true,
      showlegend: true,
      legend: { x: 0, y: 4, orientation: 'h' },
      xaxis: {
        // rangeselector: {buttons: [
        //     {
        //       count: 1,
        //       label: '1m',
        //       step: 'month',
        //       stepmode: 'backward'
        //     },
        //     {
        //       count: 6,
        //       label: '6m',
        //       step: 'month',
        //       stepmode: 'backward'
        //     },
        //     {step: 'all'}
        //   ]},
        rangeslider: {},
        type: 'date'
      },
      yaxis: {
        type: 'linear'
      }
    },
    frames: [],
    config: { responsive: true }
  }

  handleGraphUpdate = (nextPlotState) => {
    // this.plotState = nextPlotState
    this.plotState.layout = nextPlotState.layout
    this.plotState.config = nextPlotState.config
    this.plotState.frames = nextPlotState.frames
  }

  render() {
    let { activeDataSeries } = this.props.activeDataSeriesStore
    // console.log("ACTIVE SERIES: ", JSON.stringify(activeDataSeries))

    let data = activeDataSeries.filter(series => {
      return series.plotlyData
    }).map(series => {
      return series.plotlyData
    })

    // console.log("DATA: ", JSON.stringify(data))

    return (
      <div className='graph-container'>
        <Plot
          className='js-plotly-plot'
          // data={this.plotState.data}
          data={data}
          layout={this.plotState.layout}
          config={this.plotState.config}
          onUpdate={this.handleGraphUpdate}
          onHover={e => { 
            // console.log("HOVER: ", JSON.stringify(e.points[0].data))
            this.props.activeDataSeriesStore.setHoverData(e.points.map(pt => {
              return {
                name: pt.data.name,
                x: pt.x,
                y: pt.y
              }
            }))
          }}
        />
      </div>
    )
  }
}

decorate(Graph, {
  plotState: observable,
  handleGraphUpdate: action
})


export default inject("actions", "activeDataSeriesStore")(observer(Graph))