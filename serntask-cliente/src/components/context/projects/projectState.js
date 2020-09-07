import React, { useReducer } from 'react'
import { projectReducer, projectContext } from '.'
import { nanoid } from 'nanoid'

import { 
    SHOW_FORMPROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_VALIDATE
} from '../../types'


const ProjectState = ({ children }) => {
    const initialState = {
        formproject : false,
        projects : [
            { id: 1, name: 'visual' },
            { id: 2, name: 'color' },
            { id: 3, name: 'desing IU' },
            { id: 4, name: 'hosting' }
        ],
        errorform: false
    }

    const [state, dispatch] = useReducer(projectReducer, initialState)

    // Function que activa el formproject
    const showFormProject = () => {
        dispatch({
            type: SHOW_FORMPROJECT
        })
    }

    // Function que obtiene/trae los proyectos.
    const getProjects = projects => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    // Function que añade un nuevo proyecto a la lista
    const addProject = project => {
        project.id = nanoid()
        dispatch({
            type: ADD_PROJECT,
            payload: project
        })
    }

    // Function que muestra el error en el formproject
    const formError = () => {
        dispatch({
            type: FORM_VALIDATE
        })
    }
    return ( 
        <projectContext.Provider
            value={{
                formproject: state.formproject,
                projects: state.projects,
                errorform: state.errorform,
                showFormProject,
                getProjects,
                addProject,
                formError
            }}>
            { children }
        </projectContext.Provider>
     )
}
 
export default ProjectState