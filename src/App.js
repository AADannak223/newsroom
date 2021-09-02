import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      navCategory: "",
      progress: 0
    }
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  changeState = (nCategory) => {
    this.setState({ navCategory: nCategory })
    console.log(this.state)
  }

  pageSize = 12;
  apiKey = process.env.REACT_APP_NEWS_API

  render() {
    return (
      <Router>
        <div>

          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Navbar changeState={this.changeState} />
          <Switch>
            <Route exact key="home" path="/">
              <News apiKey={this.apiKey} setProgress={this.setProgress} />
            </Route>
            <Route exact key="business" path="/business">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="business" country="in" />
            </Route>
            <Route exact key="entertainment" path="/entertainment">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="entertainment" country="in" />
            </Route>
            <Route exact key="general" path="/general">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="general" country="in" />
            </Route>
            <Route exact key="health" path="/health">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="health" country="in" />
            </Route>
            <Route exact key="science" path="/science">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="science" country="in" />
            </Route>
            <Route exact key="sports" path="/sports">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="sports" country="in" />
            </Route>
            <Route exact key="technology" path="/technology">
              <News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} category="technology" country="in" />
            </Route>
            <Route exact path="/about">
            </Route>

          </Switch>
        </div>
      </Router>
    )
  }
}