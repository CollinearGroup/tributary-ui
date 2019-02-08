import React, { Component } from 'react';
import Main from './main/Main'
import Nav from './nav/Nav'
import Contact from './contact/Contact'
import './App.css';
import { observer, inject } from 'mobx-react'
import { observable, decorate } from 'mobx'

class App extends Component {
  // @observable
  activePage = 'contact'

  handleContactClick = (page) => {
    this.activePage = page
  }

  renderPage =() => {
    switch(this.activePage){
      case 'main':
        return <Main />
      case 'contact':
        return <Contact />
      default:
        return <Main />
    }
  }

  render() {
    return (
      <div className="App">
        <Nav handleContactClick={this.handleContactClick} />
        {this.renderPage()}

      </div>
    );
  }
}

decorate(App, {
  activePage: observable
})

export default inject("actions", "catalogStore")(observer(App))