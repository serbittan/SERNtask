import React, { useContext, useEffect } from 'react'
import { authContext } from '../context/auth'

const Header = () => {
    // Traer el state de auth.
    const authsContext = useContext(authContext)
    const { user, handleRetrieveUser, handleOnLogout } = authsContext

    useEffect(() => {
        handleRetrieveUser()

        // eslint-disable-next-line
    }, [])
    

    return ( 
        <header className="app-header">
                {user && <p className="nombre-usuario">Hola <span>{user.name}</span></p>}

                <nav className="nav-principal">
                    <button
                        className="btn cerrar-sesion"
                        onClick={() => handleOnLogout()}
                    >Logout</button> 
                </nav>

        </header>
     )
}
 
export default Header
                        
                    