import React, { Component } from 'react'
import './Sidebar.css'
import DataSource from './DataSource';
import AddDataSource from './AddDataSource'
import { observer, inject } from 'mobx-react'
import { observable, decorate, action } from 'mobx'
import cx from 'classnames'
import Analysis from './Analysis';
import Loader from 'react-loader-spinner'

class Sidebar extends Component {
  // @observable
  activeTabId = "sidebar-tab-1"

  handleTabClick = e => { this.activeTabId = e.target.id }

  searchChange = e => {
    let filterVal = e.target.value
    if(filterVal.length > 0) {
      this.props.appStateStore.setFilter(filterVal)
    } else {
      this.props.appStateStore.setFilter(undefined)
    }
  }

  searchOnLoad = e => {
    if(this.props.appStateStore && this.props.appStateStore.filterValue && !e.target.value) {
      console.log("Setting search!")
      e.target.value = this.props.appStateStore.filterValue
    }
  }

  handleAddDataSourceClick = (e) => {
    this.props.appStateStore.pushState('addDataSource')
  }

  render() {
    let { dataSources, state, fetchCatalogSources } = this.props.catalogStore

    //initialize or update CatalogSources
    if (state === "pending") {
      fetchCatalogSources()
    }

    let filterValue = ''
    if(this.props.appStateStore && this.props.appStateStore.filterValue) {
      filterValue = this.props.appStateStore.filterValue
    }

    return <div>
      {this.props.appStateStore.contentState === 'addDataSource' ?

        <AddDataSource
          handleAddDataSourceClick={this.handleAddDataSourceClick}
        />
        :
        <div className='sidebar-container'>
          <div className='sidebar-tabs'>
            <div
              className='tab-list'
              onClick={this.handleTabClick}
            >
              <div
                id="sidebar-tab-1"
                className={cx("tab", {
                  active: this.activeTabId === "sidebar-tab-1"
                })}
              >
                datasources
          </div>
              <div
                id="sidebar-tab-2"
                className={cx("tab", {
                  active: this.activeTabId === "sidebar-tab-2"
                })}
              >
                analysis
          </div>
            </div>
            <div className='tab-content'>
              {this.activeTabId === "sidebar-tab-1" ?
                (<div className='data-sources'>
                  <div className="data-source-search" >
                    <i className="material-icons search-icon">
                      search
              </i>
                    <input className={filterValue.length > 2 ? 
                      "data-source-search-input search-active" : 
                      "data-source-search-input"} type="search" placeholder="Search" 
                      value={filterValue}
                      onChange={this.searchChange} onLoad={this.searchOnLoad}/>
                  </div>
                  <div className="data-source-cards-container">
                    {(state === 'pending') &&
                      <div className='loading-data-series-spinner-container'>
                        <Loader
                          type="Oval"
                          color="#fff"
                          height="40"
                          width="40"
                        />
                      </div>}
                    {dataSources.map(source => {
                      return <DataSource key={source.id} source={source} filterVal={filterValue} />
                    })}
                  </div>
                  <div className="add-data-source-container">
                    <button
                      id="sidebar-tab-3"
                      className="add-data-source"
                      onClick={this.handleAddDataSourceClick}
                    >
                      Add Your Own Data
              </button>
                  </div>
                </div>) : <Analysis />}
            </div>
          </div>
        </div>
      }

    </div>
  }
}

decorate(Sidebar, {
  activeTabId: observable,
  showAddDataSource: observable,
  handleAddDataSourceClick: action
})

export default inject("actions", "catalogStore", "appStateStore")(observer(Sidebar))