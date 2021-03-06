import React, { useState, useContext, useEffect } from 'react'
import { projectContext } from '../context/projects'
import { taskContext } from '../context/tasks'



const FormTasks = () => {
    // Traer state de project.
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    // Traer state de task.
    const tasksContext = useContext(taskContext)
    const { taskselected, errorTask, addTask, getTasks, taskError, handleUpdateTask, cleanTask } = tasksContext

    // State propio del form.
    const [task, setTask] = useState({
        name: ''
    })
    const { name } = task

    // Function que lee los inputs del form
    const handleOnChange = event => {
        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    }
    

    // Efecto que despues de renderizar comprueba si hay taskselected en true
    useEffect(() => {
        if (taskselected !== null) {
            setTask(taskselected)
        } else {
            // si tareaselected vuelve a null limpio el Form.
            setTask({
                name: ''
            })
        }
        
    },[taskselected])


    // Function que envia la task cuando user hace click
    const handleOnSubmit = event => {
        event.preventDefault()

        // validar campos
        if (!name.trim()) {
            taskError()

            return
        }
        if (taskselected) {
            handleUpdateTask(task)

            getTasks(task.project)

            cleanTask()
        } else {
            // añadirle propiedades a newtask
            task.project = project.id
            // task.status = false
            addTask(task)
            getTasks(task.project)

        }


        // reiniciar formtask
        setTask({
            name: ''
        })
    }

    return (
        <div className="formulario">
            {project && <form
                    onSubmit={handleOnSubmit}>
                        
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task Name"
                        name="name"
                        autoFocus={true}
                        onChange={handleOnChange}
                        value={name}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-block btn-primario"
                        value={taskselected ? "Save Task" : "Add Task"}
                    />
                </div>
            </form>}

            {errorTask && <p className="mensaje error">Task Name is required!</p>}
        </div>
    )
}

export default FormTasks