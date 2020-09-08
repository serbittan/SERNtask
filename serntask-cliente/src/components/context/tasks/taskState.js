import React, { useReducer } from 'react'
import { taskReducer, taskContext } from '.'

import {
    GET_TASKS,
    ADD_TASK
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
        tasksproject: []
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
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    return ( 
        <taskContext.Provider
            value={{
                tasks: state.tasks,
                tasksproject: state.tasksproject,
                getTasks,
                addTask
            }}>
            { children }
        </taskContext.Provider>
     )
}
 
export default TaskState