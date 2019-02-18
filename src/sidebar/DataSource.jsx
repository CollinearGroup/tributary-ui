import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, decorate } from 'mobx';
import defaultDataSourceLogo from '../assets/tributary-avatar.svg';
import cx from 'classnames';
import ActiveDataSeriesSidebar from './ActiveDataSeriesSidebar';
import isEmpty from 'lodash.isempty';

class DataSource extends Component {
  // @observable
  componentState = {
    collapsible: this.props.collapsible === undefined || this.props.collapsible,
    expanded: !(this.props.collapsible === undefined || this.props.collapsible) || false,
    selectedSeries: [],
    selectedCheckboxes: [],
    propertyInput: '',
    errorMessage: '',
  }

  handlePlotClick = (e) => {
    this.componentState.errorMessage = ''
    this.componentState.selectedSeries.forEach(async selectedProperty => {
      let plotData = {
        id: `${Date.now()}-${selectedProperty}`,
        sourceId: this.props.source.id,
        sourceName: this.props.source.meta.server.name,
        serviceUrl: this.props.source.serviceUrl,
        propertyInput: this.componentState.propertyInput,
        property: {
          key: selectedProperty,
          name: this.props.source.meta.availableDataSeries[selectedProperty].name
        },
      }

      plotData.name = `${plotData.sourceName} - ${plotData.property.name}`
      if (plotData.propertyInput) {
        plotData.name += ` - ${plotData.propertyInput}`
      }

      //Add the attribute
      if (this.props.source.meta.availableDataSeries[selectedProperty].attributes) {
        plotData.attribute = Object.keys(this.props.source.meta.availableDataSeries[selectedProperty].attributes)[0]
      }

      //Look in the store for a duplicate name and prevent it from adding
      for (let ser of this.props.activeDataSeriesStore.activeDataSeries) {
        if (ser.name === plotData.name) {
          this.componentState.errorMessage = 'Sorry, the data you selected is already plotted.'
          return
        }
      }

      try {
        plotData.requestInFlight = true
        this.componentState.errorMessage = ''
        this.props.actions.addActiveDataSeries(this.props.activeDataSeriesStore, plotData)

      } catch (err) {
        this.componentState.errorMessage = "Unable to retrieve data."
        console.error("datasource err", err)
      }
    })
    this.componentState.propertyInput = ''
    this.componentState.selectedSeries = []
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
    if (!this.componentState.collapsible) {
      return
    }
    this.componentState.expanded = !this.componentState.expanded
  }

  determineDataSeriesInput = (dataSeriesProps) => {
    let input = dataSeriesProps ? dataSeriesProps[Object.keys(dataSeriesProps)[0]] : {}
    if (!isEmpty(dataSeriesProps)
      && dataSeriesProps.location
      && dataSeriesProps.location.selectionList) {

      input = dataSeriesProps.location.selectionList
    }
    return input
  }

  render() {
    let { meta /*, serviceUrl, status */ } = this.props.source
    let logo = meta.server.attribution.logo

    let dataSeriesProps = meta.availableDataSeries[Object.keys(meta.availableDataSeries)[0]].attributes
    let dataSeriesInput = this.determineDataSeriesInput(dataSeriesProps)
    let isEnum = dataSeriesInput.length
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
            <img className="card-img" src={logo || defaultDataSourceLogo} alt="Data Source Logo" />
          </div>
          <div className="card-content">
            <div className="arrow-container">
              <h2 className="card-server-name">{meta.server.name}</h2>
              {this.componentState.collapsible && <i className="material-icons arrow-icon">
                {this.componentState.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </i>}
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
            {!isEnum && dataSeriesProps && <Fragment>
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
            {isEnum && <Fragment>
              <select
                onChange={this.handlePropertyInputChange}
                name="locations">
                {dataSeriesInput.map(location => {
                  return <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                })}
              </select>
            </Fragment>}

            <div className="checkbox-group">

              {/* <h3 className="tbt-form-label">Properties</h3> */}
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
            <div className="tbt-button-container">
              {!this.props.disablePlot && <button
                className="tbt-button"
                onClick={this.handlePlotClick}
                disabled={this.componentState.selectedSeries.length === 0}
              >
                Plot
              </button>}
            </div>
            {
              this.componentState.errorMessage &&
              <div className="data-source-request-error">{this.componentState.errorMessage}</div>
            }
          </div>
        </div>
      </div>)
  }

}

decorate(DataSource, {
  componentState: observable,
  toggleExpanded: action,
  handlePlotClick: action
})

export default inject("actions", "activeDataSeriesStore")(observer(DataSource))