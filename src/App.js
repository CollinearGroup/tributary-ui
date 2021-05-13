//Tributary Project User Interface
// MIT License
//
// Copyright (C) 2021  Collinear Group, LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// See LICENSE in the project root for license information.
import React, { Component } from 'react';
import Main from './main/Main'
import Nav from './nav/Nav'
import Contact from './contact/Contact'
import './App.css';
import { observer, inject } from 'mobx-react'
import { observable, decorate } from 'mobx'

class App extends Component {
  // @observable
  activePage = 'main';

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