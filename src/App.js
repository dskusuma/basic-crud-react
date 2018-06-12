import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'BASIC CRUD APP',
      act: 0,
      index:'',
      postData:[]
    }
  }

  funcSubmitPost = (e) => {
    e.preventDefault();
    console.log('try');

    let postData = this.state.postData;
    let userID = this.refs.userID.value;
    let userPost = this.refs.userPost.value;

    if(this.state.act === 0) {
      let currentData = {
        userID, userPost
      }
      postData.push(currentData);
    }else{
      let index = this.state.index;
      postData[index].userID = userID;
      postData[index].userPost = userPost;
    }
    

    this.setState({
      postData: postData,
      index: 0
    })

    this.refs.appForm.reset();

  }

  funcRemovePost = (key_i) => {
    let currentData = this.state.postData;
    currentData.splice(key_i,1);
    this.setState({
      postData: currentData
    })
  }

  funcEditPost = (key_i) => {
    let currentData = this.state.postData[key_i];
    this.refs.userID.value = currentData.userID;
    this.refs.userPost.value = currentData.userPost;

    this.setState({
      act: 1,
      index: key_i,
    })

    this.refs.userID.focus();
  }
  render() {
    let postData = this.state.postData;
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
          <button onClick={this.funcSubmitPost} className="submitButton"> Post </button>
        </form>
        <pre>
          {postData.map((dt, key_i) => 
            <li key={key_i} className="appList">
              {key_i+1}.{dt.userID}, {dt.userPost}
              <button onClick={() => this.funcRemovePost(key_i)} className="removeButton"> Remove </button>
              <button onClick={() => this.funcEditPost(key_i)} className="editButton"> Edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
