import React, { useContext, useEffect } from 'react'
import { Sidebar, Header } from '../layout'
import { FormTasks, ResultTasks } from '../tasks'
import { authContext } from '../context/auth'

const Projects = () => {
    // Traer state de auth.
    const authsContext = useContext(authContext)
    const { handleRetrieveUser } = authsContext

    // Si estoy autenticado se trae la info de user y activa el token en headers.
    useEffect(() => {
        handleRetrieveUser()

        // eslint-disable-next-line
    }, [])


    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Header />
                <main>
                    <FormTasks />

                    <div className="contenedor-tareas">

                        <ResultTasks />

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Projects