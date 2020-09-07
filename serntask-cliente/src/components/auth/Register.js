import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    // Register state
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })
    const { name, email, password, confirm } = user

    // Para leer los campos del form
    const handleOnChange = event => {
        setUser({
            ...user, 
            [event.target.name]: event.target.value
        })
    }

    // Cuando user quiere registarse
    const handleOnSubmit = event => {
        event.preventDefault()

        // validar campos
        if (name.trim() || email.trim() || password.trim() || confirm.trim())  return
        // password 6 caracteres
        if (password.length < 6) return
        // password y confirm iguales
        if (password !== confirm) return
           
        // enviar al action
        
        
        // setear campos
        setUser({
            name: '',
            email: '',
            password: '',
            confirm: ''
        })
    }
    return (
        <div className="form-usuario">
            <div className="contenedor-form">
                <h1>Register</h1>
                <form
                    onSubmit={handleOnSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            name="name"
                            onChange={handleOnChange}
                            value={name}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            name="email"
                            onChange={handleOnChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Your password"
                            name="password"
                            onChange={handleOnChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirm">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm"
                            placeholder="Repeat password"
                            name="confirm"
                            onChange={handleOnChange}
                            value={confirm}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Register"
                        />
                    </div>
                </form>
                <Link to={"/"} className="enlace-cuenta">Go To Login</Link>
            </div>
        </div>
    )
}

export default Register