import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action, decorate } from 'mobx'
import defaultDataSourceLog from '../logo.svg'
import cx from 'classnames'
import ActiveDataSeriesSidebar from './ActiveDataSeriesSidebar';

class DataSource extends Component {
  // @observable
  componentState = {
    expanded: false,
    selectedSeries: [],
    selectedCheckboxes:[],
    propertyInput: ''
  }

  handlePlotClick = (e) => {
    this.componentState.selectedSeries.forEach(selectedSeries => {
      let plotData = {
        id: `${Date.now()}-${selectedSeries}`,
        sourceId: this.props.source.id,
        propertyInput: this.componentState.propertyInput,
        property: {
          key: selectedSeries
          //TODO: Add display name, description, etc.
        }
      }
      this.props.actions.addActiveDataSeries(this.props.activeDataSeriesStore, plotData)
      this.componentState.propertyInput = ''
      this.componentState.selectedSeries = []
    })
  }

  handleCheckboxClick = (e) => {
    let { checked, dataset } = e.currentTarget
    if (checked) {
      if (!this.componentState.selectedSeries.includes(dataset.seriesName)) {
        this.componentState.selectedSeries.push(dataset.seriesName)
      }
    } else {
      //Remove the series
      this.componentState.selectedSeries =
        this.componentState.selectedSeries.filter(series => {
          return series !== dataset.seriesName
        })
    }
  }

  handlePropertyInputChange = (e) => {
    this.componentState.propertyInput = e.target.value
  }

  toggleExpanded = () => {
    this.componentState.expanded = !this.componentState.expanded
  }

  render() {
    let { meta /*, serviceUrl, status */ } = this.props.source
    let logo = meta.server.attribution.logo

    let dataSeriesProps = meta.availableDataSeries[Object.keys(meta.availableDataSeries)[0]].attributes
    let dataSeriesInput = dataSeriesProps ? dataSeriesProps[Object.keys(dataSeriesProps)[0]] : {}

    let plottedSeries = []
    this.props.activeDataSeriesStore.activeDataSeries.forEach(series => {
      if (series.sourceId === this.props.source.id) {
        plottedSeries.push(
          <ActiveDataSeriesSidebar key={series.id} series={series} />
        )
      }
    })
    // console.log("PLOTSERIES: ", this.props.activeDataSeriesStore.activeDataSeries)


    return (
      <div className="card">
        <div className='card-collapse-toggle' onClick={this.toggleExpanded}>
          <div className="card-img-container">
            <img className="card-img" src={logo || defaultDataSourceLog} alt="Data Source Logo" />
          </div>
          <div className="card-content">
            <div className="arrow-container">
              <h2 className="card-server-name">{meta.server.name}</h2>
              <i className="material-icons arrow-icon">
                {this.componentState.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </i>
            </div>
            <p className="card-server-description">{meta.server.description}</p>

          </div>
        </div>
        <div id='active-series' className="active-series-container">
          {plottedSeries}
        </div>
        <div className={cx("collapsible-content", {
          expanded: this.componentState.expanded
        })}>
          <div className="collapsible-content-inner">
            <div className="checkbox-group">

              <h3 className="tbt-form-label">Properties</h3>
              {Object.keys(meta.availableDataSeries).map(series => {
                const property = meta.availableDataSeries[series].name
                return (<div key={property}>
                  <label className="checkbox-label" htmlFor={`input-${series}-${this.props.source.id}`}>{property}
                    <input
                      id={`input-${series}-${this.props.source.id}`}
                      data-series-name={series}
                      className="checkbox"
                      type="checkbox"
                      checked={this.componentState.selectedSeries.includes(series)}
                      name={property}
                      onChange={this.handleCheckboxClick}
                    />
                  </label>
                </div>)
              })}
            </div>
            {dataSeriesProps && <Fragment>
              <label className="tbt-form-label">{dataSeriesInput.name}</label>
              <input
                className="tbt-form-input"
                type="text"
                value={this.componentState.propertyInput}
                name={`${meta.server.name}-search-terms`}
                placeholder={dataSeriesInput.description}
                onChange={this.handlePropertyInputChange}
              /></Fragment>
            }
            <div className="tbt-button-container">
              <button
                className="tbt-button"
                onClick={this.handlePlotClick}
              >
                Plot
                  </button>
            </div>
          </div>
        </div>
      </div>)
  }

}

decorate(DataSource, {
  componentState: observable,
  toggleExpanded: action
})

export default inject("actions", "activeDataSeriesStore")(observer(DataSource))