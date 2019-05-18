import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import './Content.css'
import './Graph.css'
import graphColors from '../assets/graphColors'
import { observable, decorate, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'

class Graph extends Component {
  state = {
    inView: {},
    maxUnitError: false
  }
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
        type: 'date',
        domain: [0,1]
      },
      yaxis: { //default (no units)
        title:'yAxis',
        zerolinecolor: '#898e91',
        gridcolor: '#898e91',
        type: 'linear'
      },
      yaxis2: { //default (no units)
        title: 'SEAN CHEVVVVV',
        zerolinecolor: '#898e91',
        gridcolor: '#898e91',
        type: 'linear',
        overlaying: 'y',
        anchor:'free',
        position: 1,
        side:'right'
            //       title: yAxisMap[key],
    //       zerolinecolor: '#898e91',
    //       gridcolor: '#898e91',
    //       overlaying: 'y', 
    //       type: 'linear',
    //       anchor: 'free',
    //       position: 0.1*i

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

  handleCheckboxClick = (unit) => {
    let copy = _.cloneDeep(this.state.inView)
    let keys = Object.keys(copy)
    if(keys.includes(unit)){ //if already checked
      delete copy[unit]
      let remainingKey = Object.keys(copy)[0] //will be the remaining key or undefined
      if(copy[remainingKey]==='y2'){ //if we deleted y1
        copy[remainingKey]='y'
      }
      this.setState({
        inView:copy,
        maxUnitError:false
      })
      return
    } else { //unchecked
      if(keys.length>1){ //max units in view is 2
        this.setState({
          maxUnitError:true
        })
        return
      } else { //can add the unit
        if(keys.length===0){
          copy[unit]='y'
        } else {
          copy[unit]=`y${keys.length+1}`
        }
        this.setState({
          inView:copy,
          maxUnitError:false
        })
      }
    }

    //maximum units in view is 2
    if(Object.keys(this.state.inView).length>1)
    copy.push(unit)
    this.setState({
      inView: copy
    })
  }

  render() {
    let { activeDataSeries } = this.props.activeDataSeriesStore

    let data = activeDataSeries.filter(series => {
      return (series.plotlyData)
    }).map(series => {
      return series.plotlyData
    })

    //map all the units associated with the dataa
    let unitsMap = {}
    data.forEach(datum=>{
      if(!unitsMap[datum.units]){
        unitsMap[datum.units] = true
      }
    })

    //filter down the data to what should be in view, and set new yaxis
    let dataInView = data.filter(datum => {
      return Object.keys(this.state.inView).includes(datum.units)
    })

    dataInView.forEach((datum)=>{
      //set the data yaxis
      datum.yaxis = this.state.inView[datum.units]
      //set the yaxis title to the unit
      //this.state.inView[unit] format looks like y, y2, y3, etc..., corresponding to plotly layout yaxis keys of yaxis, yaxis2, yaxis3 etc...
      let layoutYAxis = `yaxis${this.state.inView[datum.units].slice(1)}`
      console.log(layoutYAxis)
      this.plotState.layout[layoutYAxis].title = datum.units
    })

    console.log(dataInView)
    
    // map((datum, i)=>{
    //   datum.yaxis = `y${i+1}`
    //   return datum
    // })

    // let yAxisList = Object.keys(yAxisMap)

    // // to make room for multiple y axis, must shift xaxis domain
    // if(yAxisList.length){
    //   let shift = 0.1*(yAxisList.length-1)+0.1
    //   this.plotState.layout.xaxis.domain=[shift,1]
    // }

    // yAxisList.forEach((key,i)=>{

    //   //Plotly data.yaxis layout looks like y, y2, y3, etc..., corresponding to plotly yaxis keys of yaxis, yaxis2, yaxis3 etc...
    //   let layoutYAxis = `yaxis${key.slice(1)}`

    //   //baseline yaxis should not have overlaying, anchor, or position types set
    //   if(i===0){
    //     this.plotState.layout[layoutYAxis]={
    //       title: yAxisMap[key],
    //       zerolinecolor: '#898e91',
    //       gridcolor: '#898e91',
    //       type: 'linear'
    //     }
    //   } else {
    //     this.plotState.layout[layoutYAxis]={
    //       title: yAxisMap[key],
    //       zerolinecolor: '#898e91',
    //       gridcolor: '#898e91',
    //       overlaying: 'y', 
    //       type: 'linear',
    //       anchor: 'free',
    //       position: 0.1*i
    //     }
    //   }
    // })

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

    return (
      <div className='graph-container'>
        <Plot
          className='js-plotly-plot'
          data={dataInView}
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
        <div className="checkbox-group">
          <h3 className="tbt-form-label">In View</h3>
          {Object.keys(unitsMap).map(unit => {
            return (
            <div key={unit}>
              <label className="checkbox-label">{unit}
                <input
                  id={`input-${unit}`}
                  className="checkbox"
                  type="checkbox"
                  checked={Object.keys(this.state.inView).includes(unit)}
                  name={unit}
                  onChange={()=>this.handleCheckboxClick(unit)}
                />
              </label>
            </div>)
          })}
        </div>
          {
            this.state.maxUnitError &&
            <div className="data-source-request-error">Maximum Number of Units in View is 2</div>
          }

      </div>
    )
  }
}

decorate(Graph, {
  plotState: observable,
  handleGraphUpdate: action
})


export default inject("actions", "activeDataSeriesStore")(observer(Graph))