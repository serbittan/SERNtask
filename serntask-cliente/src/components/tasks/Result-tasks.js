import React, { Fragment } from 'react'
import { ItemTask } from '.'
import { ButtonRemove } from '../layout'

const ResultTasks = () => {
    const tasks = [
        { id: 1, name: 'color calidos', status: false, projectId: 2 },
        { id: 2, name: 'color ocres', status: true, projectId: 3 },
        { id: 3, name: 'color turquesas', status: false, projectId: 3 },
        { id: 4, name: 'main principal', status: true, projectId: 1 },
        { id: 5, name: 'header luminoso', status: true, projectId: 4 },
        { id: 6, name: 'acabados', status: false, projectId: 1 },
        { id: 7, name: 'navegacion', status: false, projectId: 4 },
    ]
    return (
        <Fragment>
            <h2>Project: Color</h2>

            <ul className="listado-tareas">
                {tasks.length === 0 ?
                    (<li className="tarea"><p>No tasks yet!</p></li>)
                    :
                    (tasks.map(task =>
                        <ItemTask
                            key={task.id}
                            task={task}
                        />)
                    )}
            </ul>
            <ButtonRemove/>
        </Fragment>
    )
}

export default ResultTasks