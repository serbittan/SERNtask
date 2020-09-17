import React, { useReducer } from 'react'
import { taskReducer, taskContext } from '.'
import { createTask, deleteTasks, retrieveTasks, updateTask } from '../../../logic'

import {
    GET_TASKS,
    ADD_TASK,
    TASK_VALIDATE,
    // STATUS_TASK,
    DELETE_TASK,
    TASK_SELECTED,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types'

const TaskState = ({ children }) => {
    const initialState = {
        tasksproject: [],
        errorTask: false,
        taskselected: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState)

    // Function que obtiene las tasks de un project.
    const getTasks = project => {
        (async () => {
            try {
                const response = await retrieveTasks(project)
                dispatch({
                    type: GET_TASKS,
                    payload: response.data
                })
            } catch (error) {
                console.log(error.response)
            }
        })()
    }


    // Function para agregar nuevas tasks a un proyecto.
    const addTask = task => {
        (async () => {
            try {
                await createTask(task)
                dispatch({
                    type: ADD_TASK,
                    payload: task
                })
            } catch (error) {
                console.log(error.response)
            }
        })()
    }


    // Function que valida el formtask
    const taskError = () => {
        dispatch({
            type: TASK_VALIDATE
        })
    }

    // Function para modificar status de task.
    // La unificamos en una: status/edit => en handleUpdadeTask
    // const statusTask = task => {
    //     dispatch({
    //         type: STATUS_TASK,
    //         payload: task
    //     })
    // }

    // Function que elimina una task.
    const deleteTask = (id, project) => {
        (async () => {
            try {
                await deleteTasks(id, project)
                dispatch({
                    type: DELETE_TASK,
                    payload: id
                })
            } catch (error) {
                console.log(error.response)
            }
        })()

    }

    // Function que selecciona una tarea.
    const taskSelected = task => {
        dispatch({
            type: TASK_SELECTED,
            payload: task
        })
    }

    
    // Function que actualiza una tarea o la edita.
    const handleUpdateTask = task => {
        (async () => {
            try {
                const response = await updateTask(task)
                dispatch({
                    type: UPDATE_TASK,
                    payload: response.data
                })
            } catch (error) {
                console.log(error)
            }
        })()

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
                // tasks: state.tasks,
                tasksproject: state.tasksproject,
                errorTask: state.errorTask,
                taskselected: state.taskselected,
                getTasks,
                addTask,
                taskError,
                // statusTask,
                deleteTask,
                taskSelected,
                handleUpdateTask,
                cleanTask
            }}>
            { children}
        </taskContext.Provider>
    )
}

export default TaskState