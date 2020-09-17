import React, { useContext } from 'react'
import { taskContext } from '../context/tasks'
import { projectContext } from '../context/projects'


const ItemTask = ({ task }) => {
    const { name, status } = task
    // Traer state de project.
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    // Traer state de task.
    const tasksContext = useContext(taskContext)
    const { deleteTask, getTasks, taskSelected, handleUpdateTask, cleanTask } = tasksContext

    // Function para cambiar status.
    const handleOnStatus = task => {
        if (task.status) {
            task.status = false
        } else {
            task.status = true
        }
        handleUpdateTask(task)
        // statusTask(task)
    }

    // Funcion que elimina una task.
    const handleDelete = id => {
        deleteTask(id, project.id)
        getTasks(project.id)
        // ejecutamos cleanTask para limpiar el FormTask cuando elimina una tarea
        cleanTask()
    }

    // Function que selecciona una task
    const handleOnSelectedTask = task => {
        taskSelected(task)

    }


    return (
        <li className="tarea sombra">
            <p>{name}</p>

            <div className="estado">
                {status ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => handleOnStatus(task)}
                        >Completed</button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => handleOnStatus(task)}
                        >Incompleted</button>
                    )
                }</div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => handleOnSelectedTask(task)}
                >Edit</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => handleDelete(task.id)}
                >Delete</button>
            </div>

        </li>
    )
}

export default ItemTask