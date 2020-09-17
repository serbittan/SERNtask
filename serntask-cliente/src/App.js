import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, Register } from './components/auth'
import { Projects } from './components/projects'
import { ProjectState } from './components/context/projects'
import { TaskState } from './components/context/tasks'
import { AlertState } from './components/context/alerts'
import { AuthState } from './components/context/auth'
import tokenAuth from './config/token-auth'
import PrivateRoute from './components/route/Private-route'

// Revisar si tenemos un token. Esto me permite tener el token en headers siempre que este autenticado.
// Solo añado este código en handleRetrieveUser y desde aquí lo manejo en el resto de lógicas.
const token = localStorage.getItem('token') 
    if (token) {
      tokenAuth(token)
    }

    
function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  )
}

export default App
