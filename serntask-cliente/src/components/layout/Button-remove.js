import React, { useContext } from 'react'
import { projectContext } from '../context/projects'

const ButtonRemove = () => {
    // Traer state de project.
    const projectsContext = useContext(projectContext)
    const { project, removeProject } = projectsContext


    return ( 
        <button
            onClick={() => removeProject(project.id)}
            type="button"
            className="btn btn-eliminar"
        >Remove Project &times;</button>
     )
}
 
export default ButtonRemove