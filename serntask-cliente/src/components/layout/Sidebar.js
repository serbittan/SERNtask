import React from 'react'
import { FormProjects, ResultProjects } from '../projects'

const Sidebar = () => {
    return ( 
        <aside>
            <h1>SERN<span>Tasks</span></h1>
                <FormProjects />
            <div className="proyectos">
                <h2>Your Projects</h2>
                <ResultProjects />
            </div>
            
        </aside>
     )
}
 
export default Sidebar