import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className="form-usuario">
            <div className="contenedor-form">
                <h1>Register</h1>
                <form>
                    <div className="campo-form">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            name="name"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            name="email"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Your password"
                            name="password"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirm">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm"
                            placeholder="Repeat password"
                            name="confirm"
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