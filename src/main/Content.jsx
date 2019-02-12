import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import './Content.css'
import './Graph.css'
import graphColors from '../assets/graphColors'
import { observable, decorate, action } from 'mobx'
import { observer, inject } from 'mobx-react'

class Content extends Component {
  // @observable
  plotState = {
    data:
    [{
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      y: [0, 3, 6, 4, 5, 2, 3, 5, 4],
      type: 'scatter',
      mode: 'lines',
      name: 'test1'
    },
    {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      y: [0, 4, 7, 8, 3, 6, 3, 3, 4],
      type: 'scatter',
      mode: 'lines',
      name: 'test2'
    }],

    // [{
    //   x: fakeData.initialDataSet.map(datum => new Date(datum[0])),
    //   y: fakeData.initialDataSet.map(datum => datum[1]),
    //   type: 'scatter',
    //   mode: 'lines',
    //   marker: { color: 'purple' }
    // }, {
    //   x: fakeData.initialDataSet.map(datum => new Date(datum[0])),
    //   y: fakeData.initialDataSet.map(datum => datum[1]),
    //   type: 'scatter',
    //   mode: 'lines',
    //   marker: { color: 'yellow' }
    // }],
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
    this.plotState = nextPlotState
  }

  syncSeries(store) {
    console.log("Called sync")
    store.forEach(dt => {
      console.log("DT: ", JSON.stringify(dt))
      let localSeries = this.plotState.data.filter(o => {
        return o.id === dt.id
      })
      if(localSeries.length === 0) {
        console.log("DS: Adding ", dt)
        this.plotState.data.push({
          x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          y: [0, 3, 6, 4, 5, 2, 3, 5, 4],
          type: 'scatter',
          mode: 'lines',
          name: 'test1',
          marker: { color: 'purple' },
          id: dt.id
        })
        // console.log("DATA: ", JSON.stringify(this.plotState.data))
      } else {
        console.log("FOUND: ", localSeries, dt.id)
      }
    })
  }

  render() {
    let { activeDataSeries } = this.props.activeDataSeriesStore
    console.log("ACTIVE SERIES: ", JSON.stringify(activeDataSeries))
    this.syncSeries(activeDataSeries)

    return (
      <div className='content-container'>
        <Plot
          className='js-plotly-plot'
          data={this.plotState.data}
          layout={this.plotState.layout}
          config={this.plotState.config}
          onUpdate={this.handleGraphUpdate}
        />
      </div>
    )
  }
}

decorate(Content, {
  plotState: observable,
  handleGraphUpdate: action
})


export default inject("actions", "activeDataSeriesStore")(observer(Content))