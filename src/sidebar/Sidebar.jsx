import React, { Component } from 'react'
import './Sidebar.css'
import DataSource from './DataSource';
import AddDataSource from './AddDataSource'
import { observer, inject } from 'mobx-react'
import { observable, decorate, action } from 'mobx'
import cx from 'classnames'

class Sidebar extends Component {
  // @observable
  activeTabId = "sidebar-tab-1"

  handleTabClick = e => { this.activeTabId = e.target.id }

  handleAddDataSourceClick = (e) => {
    this.props.appStateStore.pushState('addDataSource')
  }

  render() {
    let { dataSources } = this.props.catalogStore
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
                  <div className="data-source-search">
                    <i className="material-icons search-icon">
                      search
              </i>
                    <input className="data-source-search-input" type="search" placeholder="Search" />
                  </div>
                  <div className="data-source-cards-container">
                    {dataSources.map(source => {
                      return <DataSource key={source.id} source={source} />
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
                </div>) : <div>analysis content</div>}
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