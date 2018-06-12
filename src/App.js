import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

// URL : https://jsonplaceholder.typicode.com/posts

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
    let userId = this.refs.userId.value;
    let title = this.refs.title.value;
    let body = this.refs.body.value;

    if(this.state.act === 0) {
      let currentData = {
        userId, title,body
      }
      postData.push(currentData);
    }else{
      let index = this.state.index;
      postData[index].userId = userId;
      postData[index].title = title;
      postData[index].body = body;
    }

    this.setState({
      postData: postData,
      index: 0
    })

    this.refs.appForm.reset();

  }

  funcRemovePost = (id) => {
    let currentData = this.state.postData;
    currentData.splice(id,1);
    this.setState({
      postData: currentData
    })
  }

  funcEditPost = (id) => {
    let currentData = this.state.postData[id];
    this.refs.userId.value = currentData.userId;
    this.refs.title.value = currentData.title;
    this.refs.body.value = currentData.body;

    this.setState({
      act: 1,
      index: id,
    })

    this.refs.userId.focus();
  }

  funcFetchData  = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        console.log("Status Fetch Data : " + res.status);
        console.log(res.data);
        this.setState({postData: res.data});
      })
  }

  componentDidMount() {
    this.funcFetchData();
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
          <input type="text" ref="userId" placeholder="your ID" className="formField" />
          <input type="text" ref="title" placeholder="your post title..." className="formField" /> <br />
          <input type="text" ref="body" placeholder="your post body..." className="formField" />
          <button onClick={this.funcSubmitPost} className="submitButton"> Post </button>
        </form>
        <pre>
          {postData.reverse().map((dt, id) => 
            <div key={id} > 
              <li className="appList">
                [{id}].{dt.userId}, {dt.title}
                <button onClick={() => this.funcRemovePost(id)} className="removeButton"> Remove </button>
                <button onClick={() => this.funcEditPost(id)} className="editButton"> Edit </button> <br />
                {dt.body}
              </li>
            </div>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
