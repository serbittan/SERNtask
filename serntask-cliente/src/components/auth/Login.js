import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Feedback } from '.'
import { alertContext } from '../context/alerts'
import { authContext } from '../context/auth'

const Login = ({ history }) => {
    // Traer el state de auth.
    const authsContext = useContext(authContext)
    const { authenticated, message, handleLogin } = authsContext

    // Traer el state de alert.
    const alertsContext = useContext(alertContext)
    const { alert, showAlert } = alertsContext

    // Function que se ejecuta después de renderizar el componente.
    useEffect(() => {
        if (authenticated) {
            history.push('/projects')
        }
        if (message) {
            showAlert(message.msg, message.category)
             
        }
        // eslint-disable-next-line
    }, [authenticated, message, history])

    // Login state
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user

    // Para leer los campos del form
    const handleOnChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    // Cuando usuario quiere iniciar sesión
    const handleOnSubmit = event => {
        event.preventDefault()

        // validar campos
        if (!email.trim() || !password.trim()) {
            showAlert('All fields are required', 'alert-error')

            return
        }

        handleLogin(user)
    }


    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">

                {alert && <Feedback message={alert.msg} level={alert.category} />}

                <h1>Login</h1>
                <form
                    onSubmit={handleOnSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            onChange={handleOnChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            onChange={handleOnChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Login"
                        />
                    </div>

                </form>
                <Link to={"/register"} className="enlace-cuenta">Go To Register</Link>
            </div>


        </div>
    )
}

export default Login