import React from 'react'
import { Sidebar, Header } from '../layout'
import { FormTasks, ResultTasks } from '../tasks'

const Projects = () => {
    return ( 
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Header />
                <main>
                    <FormTasks/>

                    <div className="contenedor-tareas">

                        <ResultTasks/>

                    </div>
                </main>
            </div>
        </div>
     )
}
 
export default Projects