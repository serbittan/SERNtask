import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
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
        // enviar al action
        // setear
    }
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
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