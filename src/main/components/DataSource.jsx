import React, { Fragment, Component } from 'react'
import {observer} from 'mobx-react'
class DataSource extends Component{

  render(){
    let { meta, serviceUrl, status } = this.props.source
    return (<Fragment>
      <div>{meta.server.name}</div>
      <div>{serviceUrl}</div>
      <div>{meta.server.description}</div>
    </Fragment>
    )
  }

}

export default observer(DataSource)