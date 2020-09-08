import React, { useReducer } from 'react'
import { taskReducer, taskContext } from '.'
import { nanoid } from 'nanoid'

import {
    GET_TASKS,
    ADD_TASK,
    TASK_VALIDATE,
    STATUS_TASK,
    DELETE_TASK,
    TASK_SELECTED,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types'

const TaskState = ({ children }) => {
    const initialState = {
        tasks : [
            { id: 1, name: 'color calidos', status: false, projectId: 2 },
            { id: 2, name: 'color ocres', status: true, projectId: 3 },
            { id: 3, name: 'color turquesas', status: false, projectId: 3 },
            { id: 4, name: 'main principal', status: true, projectId: 1 },
            { id: 5, name: 'header luminoso', status: true, projectId: 4 },
            { id: 6, name: 'acabados', status: false, projectId: 1 },
            { id: 7, name: 'navegacion', status: false, projectId: 4 },
        ],
        tasksproject: [],
        errorTask: false,
        taskselected: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState)

    // Function que obtiene las tasks de un project.
    const getTasks = projectId => {
        dispatch({
            type: GET_TASKS,
            payload: projectId
        })
    }

    // Function para agregar nuevas tasks a un proyecto.
    const addTask = task => {
        task.id = nanoid()
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    // Function que valida el formtask
    const taskError = () =>{
        dispatch({
            type: TASK_VALIDATE
        })
    }

    // Function para modificar status de task.
    const statusTask = task => {
        dispatch({
            type: STATUS_TASK,
            payload: task
        })
    }

    // Function que elimina una task.
    const deleteTask = taskId => {
        dispatch({
            type: DELETE_TASK,
            payload: taskId
        })
    }

    // Function que selecciona una tarea.
    const taskSelected = task => {
        dispatch({
            type: TASK_SELECTED,
            payload: task
        })
    }

    // Function que actualiza una tarea o la edita.
    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })

    }

    // Function que limpia es state de taskselected para dejarla null.
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return ( 
        <taskContext.Provider
            value={{
                tasks: state.tasks,
                tasksproject: state.tasksproject,
                errorTask: state.errorTask,
                taskselected: state.taskselected,
                getTasks,
                addTask,
                taskError,
                statusTask,
                deleteTask,
                taskSelected,
                updateTask,
                cleanTask
            }}>
            { children }
        </taskContext.Provider>
     )
}
 
export default TaskState