import React, { useContext } from 'react'
import { projectContext } from '../context/projects'
import { taskContext } from '../context/tasks'

const ItemProject = ({ project }) => {
    const { name } = project

    // Traer el state de project.
    const projectsContext = useContext(projectContext)
    const { activeProject, selectedProject } = projectsContext

    // Traer el state de task.
    const tasksContext = useContext(taskContext)
    const { getTasks } = tasksContext

    // Function que recoje el proyecto seleccionado.
    const handleActiveProject = (project) => {
        activeProject(project)
        getTasks(project.id)
    }


    return (

        <li className="listado-proyectos">
            
            <a href="#!" 
                onClick={() => selectedProject(project)}
            ><i className="fas fa-pencil-alt"></i></a>
          
            <button
                onClick={() => handleActiveProject(project)}
                type="button"
                className="btn btn-blank"
            >{name}</button>

        </li>
    )
}

export default ItemProject