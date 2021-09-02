import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App(){
  const [progress, setProgress] = useState("");

  const changeProgress = (nProgress) => {
    setProgress(nProgress)
  }

  let pageSize = 12;
  let apiKey = process.env.REACT_APP_NEWS_API

    return (
      <Router>
        <div>
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
          <Navbar/>
          <Switch>
            <Route exact key="home" path="/">
              <News apiKey={apiKey} setProgress={changeProgress} />
            </Route>
            <Route exact key="business" path="/business">
              <News apiKey={apiKey} setProgress={changeProgress} pageSize={pageSize} category="business" country="in" />
            </Route>
            <Route exact key="entertainment" path="/entertainment">
              <News apiKey={apiKey} setProgress={changeProgress} pageSize={pageSize} category="entertainment" country="in" />
            </Route>
            <Route exact key="general" path="/general">
              <News apiKey={apiKey} setProgress={changeProgress} pageSize={pageSize} category="general" country="in" />
            </Route>
            <Route exact key="health" path="/health">
              <News apiKey={apiKey} setProgress={changeProgress} pageSize={pageSize} category="health" country="in" />
            </Route>
            <Route exact key="science" path="/science">
              <News apiKey={apiKey} setProgress={changeProgress} pageSize={pageSize} category="science" country="in" />
            </Route>
            <Route exact key="sports" path="/sports">
              <News apiKey={apiKey} setProgress={changeProgress} pageSize={pageSize} category="sports" country="in" />
            </Route>
            <Route exact key="technology" path="/technology">
              <News apiKey={apiKey} setProgress={changeProgress} pageSize={pageSize} category="technology" country="in" />
            </Route>
            <Route exact path="/about">
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
  export default App;