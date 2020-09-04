import React, { Component } from 'react'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import { Login, Register } from './components/auth'
import { Projects } from './components/projects'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/projects" component={Projects} />      
      </Switch>
    </Router>
  )
}

export default App
