import React, { Fragment, useContext } from 'react'
import { ItemTask } from '.'
import { ButtonRemove } from '../layout'
import { projectContext } from '../context/projects'
import { taskContext } from '../context/tasks'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ResultTasks = () => {
    // Traer state de project.
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    // Traer state de task.
    const tasksContext = useContext(taskContext)
    const { tasksproject } = tasksContext


    if (!project) return <h2>Select a project</h2>


    return (
        <Fragment>
            <h2>Project: {project.name}</h2>

            <ul className="listado-tareas">
                {tasksproject.length === 0 ?
                    (<li className="tarea"><p>No tasks yet!</p></li>)
                    :
                    (tasksproject.map(task =>

                        <ItemTask
                            key={task.id}
                            task={task}
                        />)
                    )
                }
            </ul>
            <ButtonRemove />
        </Fragment>
    )
}

export default ResultTasks