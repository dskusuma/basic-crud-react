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
      <div className="container App">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>{this.state.title}</h1>
        <p className="App-intro">
          Simple CRUD App using react
        </p>
        <div className="col-md-12">
          <div className="row">
            <div className="row">
              <div className="col-md-3">
              </div>
              <div className="col-md-6">
              <h4 > Add Post </h4>
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" ref="userId" className="form-control" placeholder="your Id" />
                  </div>
                  <div className="col-md-6">
                    <input type="text" ref="title" className="form-control" placeholder="title..." />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3">
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <input type="text" ref="body" className="form-control" placeholder="your post body..." />
                    <br />
                    <button onClick={this.funcSubmitPost} className="submitButton btn btn-success btn-block"> Post </button>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="col-md-12">
          <h3>Posts</h3>
          {/* COL-3 */}
          <div className="col-md-3">
          </div>
          {/* COL-3 END */}

          <div className="col-md-6">
            {postData.reverse().map((dt, id) => 
              <div key={id} className="row thumbnail"> 
                <li className="appList caption list-none">
                  <button type="button" className="btn btn-primary">
                    <i className="glyphicon glyphicon-user"></i> User {dt.userId}
                  </button>
                  {/* [{id}].{dt.userId}, {dt.title} */}
                  <h3> {dt.title} </h3>
                  {/* <br /> */}
                  <div className="btn-group">
                    <button onClick={() => this.funcEditPost(id)} className="editButton btn btn-warning"> 
                      <i class="glyphicon glyphicon-pencil"></i> Edit 
                    </button> 
                    <button onClick={() => this.funcRemovePost(id)} className="removeButton btn btn-danger"> 
                      <i class="glyphicon glyphicon-trash"></i>Remove 
                    </button>
                  </div>
                  <br />
                  <div className="caption text-center">
                    {dt.body}
                  </div>
                </li>
              </div>
            )}
          </div>

          {/* COL-3 */}
          <div className="col-md-3">
          </div>
          {/* COL-3 END */}
        </div>
          
        {/* <pre>
          {postData.reverse().map((dt, id) => 
            <div key={id} > 
              <li className="appList">
                [{id}].{dt.userId}, {dt.title}
                <Button bsStyle='success'>Hello</Button>
                <button onClick={() => this.funcRemovePost(id)} className="removeButton"> Remove </button>
                <button onClick={() => this.funcEditPost(id)} className="editButton"> Edit </button> <br />
                {dt.body}
              </li>
            </div>
          )}
        </pre> */}
      </div>
    );
  }
}

export default App;
