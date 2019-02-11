import React, { Component } from 'react'
// import DataSource from './DataSource';
import { observer, inject } from 'mobx-react'
// import { observable, decorate } from 'mobx'
// import cx from 'classnames'

class ActiveDataSeriesSidebar extends Component {
  // @observable
  // activeTabId = "sidebar-tab-1"

  render() {
    console.log("SERIES: ", JSON.stringify(this.props.series))
    let {series} = this.props
    return (<div>
    {series.property.key}-{series.propertyInput}
    </div>)
  }
}

// decorate(ActiveDataSeriesSidebar, {
  // activeTabId: observable
// })

export default inject("actions", "catalogStore")(observer(ActiveDataSeriesSidebar))
