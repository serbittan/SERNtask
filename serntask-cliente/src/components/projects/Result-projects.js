import React, { useContext, useEffect } from 'react'
import ItemProject from './Item-project'
import { projectContext } from '../context/projects'
import { alertContext } from '../context/alerts'
import { Feedback } from '../../components/auth'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ResultProjects = () => {
    // Traer el state de alert.
    const alertsContext = useContext(alertContext)
    const { alert, showAlert } = alertsContext

    // Traer el state de project.
    const projectsContext = useContext(projectContext)
    const { projectselected, message, projects, getProjects } = projectsContext


    // Obtener projects cuando carga el componente.
    useEffect(() => {
        if (message) {
            showAlert(message.msg, message.category)
        }
        getProjects()

        // eslint-disable-next-line
    }, [message, projectselected])

    if (projects.length === 0) return <p>Not Projects yet!!</p>


    return (
        <ul className="listado-proyectos">
            {alert && <Feedback message={alert.msg} level={alert.category}/>}
            {projects.map((project, index) => (
                <ItemProject
                    key={index}
                    project={project}
                />
            )).reverse()}
        </ul>

    )
}

export default ResultProjects



