import React, { Component } from 'react'
import DataSource from './DataSource';
import { observer, inject } from 'mobx-react'
import { observable, decorate, action } from 'mobx'
// import cx from 'classnames'
import axios from 'axios';

import './AddDataSource.css'

class AddDataSource extends Component {

  // @observable
  componentState = {
    urlInput: '',
    serviceData: '',
    urlRequestError: ''
  }

  handleCancel = () => {
    this.props.appStateStore.popState()
  }

  handleSubmit = async () => {
    if(!this.componentState.urlInput) {
      return
    }
    let response
    try {
      this.componentState.urlRequestError = ''
      response = await axios.get(this.componentState.urlInput)
    } catch (err) {
      console.log("ERR: ", err)
      this.componentState.urlRequestError = err.message
      return
    }
    let { data } = response
    console.log("Setting service data to ", data)
    this.componentState.serviceData = data
  }

  handlePublish = () => {
    this.props.catalogStore.addDataSource(this.componentState.serviceData)
    this.props.appStateStore.popState()
  }

  handleUrlInput = (e) => {
    this.componentState.urlInput = e.target.value
  }

  render() {
    return <div className='sidebar-container'>
      <div className='add-data-source-sidebar-container'>
        <div className='add-data-source-header'>ADD DATA SOURCE</div>
        <div className='add-data-source-form-container'>
          <label 
            htmlFor='addDataSourceUrlInput'
            className='add-data-source-label'
          >Data Source URL</label>
          <input
            id='addDataSourceUrlInput'
            className='add-data-source-url-input'
            type='text'
            value={this.urlInput}
            placeholder="Add URL"
            onChange={this.handleUrlInput}
            disabled={this.componentState.serviceData}
          />
          {this.componentState.urlRequestError &&
            <div className='data-source-request-error'>
              {this.componentState.urlRequestError}
            </div>
          }

          {this.componentState.serviceData &&
            <DataSource
              source={this.componentState.serviceData}
              disablePlot
              collapsible={false}
            />}
        </div>

        <div className='add-data-button-container'>
          <button
            className="tbt-button cancel-button"
            onClick={this.handleCancel}
          >
            CANCEL
      </button>
          {this.componentState.serviceData ?
            <button
              className="tbt-button"
              onClick={this.handlePublish}
            >
              SAVE 
          </button>
            : <button
              className="tbt-button"
              disabled={!this.componentState.urlInput}
              onClick={this.handleSubmit}
            >
              SUBMIT
          </button>
          }
        </div>
      </div>
    </div>
  }
}

decorate(AddDataSource, {
  componentState: observable,
  handleUrlInput: action
})


export default inject("actions", "appStateStore", "catalogStore")(observer(AddDataSource))
