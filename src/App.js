import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'BASIC CRUD APP'
    }

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
          <h1>{this.state.title}</h1>
        </header>
        <p className="App-intro">
          Simple CRUD App using react
        </p>

        {/* FORM */}
        <form ref="appForm" className="appForm">
          <input type="text" ref="userID" placeholder="your ID" className="formField" />
          <input type="text" ref="userPost" placeholder="What do you think..." className="formField" />
          <button onClick={this.submitPost} className="submitButton"> Post </button>
        </form>
      </div>
    );
  }
}

export default App;
