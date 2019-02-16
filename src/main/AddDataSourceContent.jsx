import React, { Component } from 'react'
import './Content.css'
import { observable, decorate, action } from 'mobx'
import { observer, inject } from 'mobx-react'

class AddDataSourceContent extends Component {

  render(){
    return(
      <div>
        Lots of Directions
      </div>
    )
  }

}


decorate(AddDataSourceContent, {
  contentState: observable,
  handleGraphUpdate: action
})


export default inject("actions", "appStateStore")(observer(AddDataSourceContent))