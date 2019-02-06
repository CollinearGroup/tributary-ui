import React, { Component } from 'react';
import Main from './main/Main'
import Nav from './nav/Nav'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
      <Main/>
        
      </div>
    );
  }
}

export default App;
