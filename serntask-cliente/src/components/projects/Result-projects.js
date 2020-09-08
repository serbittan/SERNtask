import React, { useContext, useEffect } from 'react'
import ItemProject from './Item-project'
import { projectContext } from '../context/projects'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ResultProjects = () => {
    // Traer el state de project
    const projectsContext = useContext(projectContext)
    const { projects, getProjects } = projectsContext


    // Obtener projects cuando carga el componente.
    useEffect(() => {
        getProjects()

        // eslint-disable-next-line
    }, [])

    if (projects.length === 0) return <p>Not Projects yet!!</p>


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



