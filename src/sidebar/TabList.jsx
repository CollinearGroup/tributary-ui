import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class TabList extends Component {
    render(){
        return <div></div>
    }
}

export default inject("actions", "catalogStore")(observer(TabList))