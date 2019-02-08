import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import './Content.css'
export default class Content extends Component {

  render() {
    return (
      <div className='content-container'>
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+points',
              marker: { color: 'red' },
            },
            { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout = {{ width: 320, height: 240, title: 'A Fancy Plot' }}
          
        />
      </div>
    )
  }
}