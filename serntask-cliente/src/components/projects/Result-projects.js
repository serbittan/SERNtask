import React, { useContext } from 'react'
import ItemProject from './Item-project'
import { projectContext } from '../context/projects'

const ResultProjects = () => {
    // Traer el state de project
    const projectsContext = useContext(projectContext)
    const { projects } = projectsContext
    
    return (
        <ul className="listado-proyectos">
            {projects.map(project => 
                <ItemProject
                    key={project.id}
                    project={project}
                />
            )}
        </ul>
    )
}

export default ResultProjects