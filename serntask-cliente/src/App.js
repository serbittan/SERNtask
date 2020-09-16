import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, Register } from './components/auth'
import { Projects } from './components/projects'
import { ProjectState } from './components/context/projects'
import { TaskState } from './components/context/tasks'
import { AlertState } from './components/context/alerts'
import { AuthState } from './components/context/auth'
import tokenAuth from './config/token-auth'


function App() {

  const token = localStorage.getItem('token') 
    if (token) {
      tokenAuth(token)
    }
  

  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  )
}

export default App
