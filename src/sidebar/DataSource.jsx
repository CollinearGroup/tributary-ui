import React, { Component } from 'react'
import { observer } from 'mobx-react'

import defaultDataSourceLog from '../logo.svg'
class DataSource extends Component {

  render() {
    let { meta /*, serviceUrl, status */ } = this.props.source
    let logo = meta.server.attribution.logo
    console.log("logo: ", logo)
    return <div className="card">
      <div className="card-img-container">
        <img className="card-img" src={logo || defaultDataSourceLog} alt="Data Source Logo" />
      </div>
      <div className="card-content">
        <h2 className="card-server-name">{meta.server.name}</h2>
        <p className="card-server-description">{meta.server.description}</p>

        <div className="checkbox-group">
          <h3 className="tbt-form-label">Properties</h3>
          {Object.keys(meta.availableDataSeries).map(series => {
            const property = meta.availableDataSeries[series].name
            return (<div key={property}>
              <input className="checkbox" type="checkbox" name={property}/>
              <label className="checkbox-label" htmlFor={property}>{property}</label>
            </div>)
          })}
        </div>
        <label className="tbt-form-label">Search Terms</label>
        <input className="tbt-form-input" type="text" name={`${meta.server.name}-search-terms`}></input>
        <div className="tbt-button-container">
          <button className="tbt-button">Plot</button>
        </div>
      </div>
    </div>
  }

}

export default observer(DataSource)