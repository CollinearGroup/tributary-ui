import React, { Component } from 'react'
import DataSource from './DataSource';
import { observer, inject } from 'mobx-react'
import { observable, decorate, action } from 'mobx'
// import cx from 'classnames'
import axios from 'axios';

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
    let source = { id: Date.now(), meta: { ...data }, serviceUrl: this.componentState.urlInput }
    console.log("Setting service data to ", source)
    this.componentState.serviceData = source
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
      <div >ADD DATA SOURCE</div>
      <input
        type='text'
        value={this.urlInput}
        id='add-data-source-url'
        placeholder="Add URL"
        onChange={this.handleUrlInput}
      />

      {this.componentState.serviceData &&
        <DataSource
          source={this.componentState.serviceData}
          disablePlot={true}
          collapsible={false}
        />}

      <div className='add-data-button-container'>
        <button
          className="tbt-button"
          onClick={this.handleCancel}
        >
          CANCEL
      </button>
        {this.componentState.serviceData ?
          <button
          className="tbt-button"
          onClick={this.handlePublish}
          >
          PUBLISH
          </button>
          : <button
          className="tbt-button"
          disabled={!this.componentState.urlInput}
            onClick={this.handleSubmit}
          >
            SUBMIT
          </button>
        }
        {this.componentState.urlRequestError && 
          <div className='data-source-request-error'>
            {this.componentState.urlRequestError}
          </div>
        }
      </div>
    </div>
  }
}

decorate(AddDataSource, {
  componentState: observable,
  handleUrlInput: action
})


export default inject("actions", "appStateStore", "catalogStore")(observer(AddDataSource))
