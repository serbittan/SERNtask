import React, { useContext } from 'react'
import { taskContext } from '../context/tasks'


const ItemTask = ({ task }) => {
    const { name, status } = task

    // Traer state de task.
    const tasksContext = useContext(taskContext)
    const { statusTask, deleteTask, getTasks, taskSelected } = tasksContext

    // Function para cambiar status.
    const handleOnStatus = task => {
        if (task.status) {
            task.status = false
        } else {
            task.status = true
        }
        statusTask(task)
    }

    // Funcion que elimina una task.
    const handleDelete = task => {
        deleteTask(task.id)
        getTasks(task.projectId)
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
                    onClick={() => handleDelete(task)}
                >Delete</button>
            </div>

        </li>
     )
}
 
export default ItemTask