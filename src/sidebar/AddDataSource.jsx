import React, { Component } from 'react'
import DataSource from './DataSource';
import { observer, inject } from 'mobx-react'
import { observable, decorate, action } from 'mobx'
import cx from 'classnames'
import axios from 'axios';

class AddDataSource extends Component {

  // @observable
  componentState = {
    urlInput: '',
    fakeRes: ''
  }

  handleCancel = () => {
    this.props.appStateStore.popState()
  }

  handleSubmit = async () => {
    let response = await axios.get(this.componentState.urlInput)
    let { data } = response
    let source = { id: Date.now(), meta: { ...data }, serviceUrl: this.componentState.urlInput }

    this.componentState.fakeRes = <DataSource source={source} />

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
      {this.componentState.fakeRes}

      <div className='add-data-button-container'>
        <button
          onClick={this.handleCancel}
        >
          CANCEL
      </button>
        <button
          onClick={this.handleSubmit}
        >
          SUBMIT
      </button>
      </div>
    </div>
  }
}

decorate(AddDataSource, {
  componentState: observable,
  handleUrlInput: action
})


export default inject("actions", "appStateStore")(observer(AddDataSource))
