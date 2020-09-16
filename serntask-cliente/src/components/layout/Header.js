import React, { useContext, useEffect } from 'react'
import { authContext } from '../context/auth'

const Header = () => {
    // Traer el state de auth.
    const authsContext = useContext(authContext)
    const { user, handleRetrieveUser } = authsContext

    useEffect(() => {
        handleRetrieveUser()
    }, [])
    

    return ( 
        <header className="app-header">
                {user && <p className="nombre-usuario">Hola <span>{user.name}</span></p>}

                <nav className="nav-principal">
                    <a  href="#!">Logout</a>
                </nav>

        </header>
     )
}
 
export default Header