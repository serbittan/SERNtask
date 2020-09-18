import React, { Fragment, useContext, useEffect } from 'react'
import { ItemTask } from '.'
import { ButtonRemove } from '../layout'
import { projectContext } from '../context/projects'
import { taskContext } from '../context/tasks'
import { alertContext } from '../context/alerts'
import { Feedback } from '../auth'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ResultTasks = () => {
    // Traer state de alerts.
    const alertsContext = useContext(alertContext)
    const { alert, showAlert } = alertsContext

    // Traer state de project.
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    // Traer state de task.
    const tasksContext = useContext(taskContext)
    const { message, tasksproject } = tasksContext

    // En caso de que aparezcan mensajes de error
    useEffect(() => {
        if (message) {
            showAlert(message.msg, message.category)
        }

        // eslint-disable-next-line
    }, [message])


    if (!project) return <h2>Select a project</h2>


    return (
        <Fragment>
            <h2>Project: {project.name}</h2>

            {alert && <Feedback message={alert.msg} level={alert.category} />}

            <ul className="listado-tareas">

                {tasksproject.length === 0 ?
                    (<li className="tarea"><p>No tasks yet!</p></li>)
                    :
                    (tasksproject.map((task, index) =>

                        <ItemTask
                            key={index}
                            task={task}
                        />)
                    ).reverse()
                }
            </ul>
            <ButtonRemove />
        </Fragment>
    )
}

export default ResultTasks