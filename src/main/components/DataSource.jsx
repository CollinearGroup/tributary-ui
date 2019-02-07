import React, { Fragment, Component } from 'react'
import {observer} from 'mobx-react'
class DataSource extends Component{

  render(){
    let { source } = this.props
    return (<Fragment>
      <div>{source.name}</div>
      <div>{source.url}</div>
    </Fragment>
    )
  }

}

export default observer(DataSource)