import React, { Component } from 'react'
import './Sidebar.css'
import DataSource from './DataSource';
import { observer, inject } from 'mobx-react'
import { observable, decorate } from 'mobx'
import cx from 'classnames'

import magnifyingGlass from '../magnifying-glass.svg'

class Sidebar extends Component {
  // @observable
  activeTabId = "sidebar-tab-1"

  handleTabClick = e => { this.activeTabId = e.target.id }

  render() {
    let { dataSources } = this.props.catalogStore
    return <div className='sidebar-container'>
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
          {this.activeTabId === "sidebar-tab-1" ? (<div className='data-sources'>
            <div className="data-source-search">
              <img className="data-source-search-icon" src={magnifyingGlass} alt="Search"/>
              <input className="data-source-search-input" type="search" placeholder="Search" />
            </div>
            {Object.keys(dataSources).map(source => {
              return <DataSource key={source} source={dataSources[source]} />
            })}
          </div>) : <div>analysis content</div>}
        </div>
      </div>
    </div>
  }
}

decorate(Sidebar, {
  activeTabId: observable
})

export default inject("actions", "catalogStore")(observer(Sidebar))