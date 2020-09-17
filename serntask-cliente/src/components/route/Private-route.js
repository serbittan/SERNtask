import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authContext } from '../../components/context/auth'


const PrivateRoute = ({ component: Component, ...props }) => {
    // Traer el state de auth.
    const authsContext = useContext(authContext)
    const { authenticated, handleRetrieveUser } = authsContext

    useEffect(() => {
        handleRetrieveUser()

        // eslint-disable-next-line
    }, []) 

    return (
        <Route {...props}
            render={props =>
                authenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect to='/' />
                    )
            }
        />
    )
}

export default PrivateRoute