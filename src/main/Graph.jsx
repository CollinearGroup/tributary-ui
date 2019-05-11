import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import './Content.css'
import './Graph.css'
import graphColors from '../assets/graphColors'
import { observable, decorate, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'

class Graph extends Component {
  // @observable
  plotState = {
    layout: {
      colorway: graphColors,
      autosize: true,
      showlegend: true,
      legend: { x: 0, y: 4, orientation: 'h' },
      plot_bgcolor: '#383e45',
      paper_bgcolor: '#22252a',
      margin: { l: 50, r: 50, t: 50 },
      font: {
        color: '#fefefe'
      },
      height: '600',
      xaxis: {
        gridcolor: '#898e91',
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
        //rangeslider: {}, //comment out rangeslider to enable scaling on y axis
        type: 'date'
      },
      yaxis: { //default (no units)
        zerolinecolor: '#898e91',
        gridcolor: '#898e91',
        type: 'linear'
      }
    },
    frames: [],
    config: { responsive: true }
  }

  handleGraphUpdate = (nextPlotState) => {
    console.log('updating')

    // this.plotState = nextPlotState
    this.plotState.layout = nextPlotState.layout
    this.plotState.config = nextPlotState.config
    this.plotState.frames = nextPlotState.frames
  }

  determineYAxisUnits = () => {
    return null
  }

  render() {
    let { activeDataSeries } = this.props.activeDataSeriesStore

    let data = activeDataSeries.filter(series => {
      return series.plotlyData
    }).map(series => {
      return series.plotlyData
    })

    let yAxisList = Object.keys(this.plotState.layout).filter(key=>key.includes('yaxis'))

    yAxisList.forEach((key,i)=>{
      //leaving the baseline yaxis unchanged
      if(i!==0){
        this.plotState.layout[key]={
          zerolinecolor: '#898e91',
          gridcolor: '#898e91',
          overlaying: 'y', 
          type: 'linear',
          anchor: 'free',
          position: 0.1*i
        }
      }
    })

    // {
    //   title: key,
    //   titlefont: {color: 'white'}, 
    //   zerolinecolor: '#898e91',
    //   gridcolor: '#898e91',
    //   overlaying: 'y', 
    //   type: 'linear',
    //   side: 'left',
    //   anchor: 'free',
    //   position: 0.1*unitTypes[key]
    // }

    console.log('rendering data: ', data)
    console.log('rendering layout: ', this.plotState.layout)

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