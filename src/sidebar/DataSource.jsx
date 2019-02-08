import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
class DataSource extends Component {

  render() {
    let { meta, serviceUrl, status } = this.props.source
    return <div className="card">
      <div className="card-img-container">
        <img className="card-img" src={meta.server.attribution.logo}/>
      </div>
      <div className="card-content">
        <h2 className="card-server-name">{meta.server.name}</h2>
        <p className="card-server-description">{meta.server.description}</p>

        <div className="checkbox-group">
          <h3>Properties</h3>
          {Object.keys(meta.availableDataSeries).map(series => {
            const property = meta.availableDataSeries[series].name
            return (<Fragment key={property}>
              <input type="checkbox" name={property}/>
              <label htmlFor={property}>{property}</label>
            </Fragment>)
          })}
        </div>
        <label>Search Terms</label>
        <input type="text" name={`${meta.server.name}-search-terms`}></input>
        <button>Plot</button>
      </div>
    </div>
  }

}

export default observer(DataSource)