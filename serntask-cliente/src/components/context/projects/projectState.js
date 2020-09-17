import React, { useReducer } from 'react'
import { projectReducer, projectContext } from '.'
import { createProject, retrieveProjects, deleteProject } from '../../../logic'



import { 
    SHOW_FORMPROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_VALIDATE,
    CURRENT_PROJECT,
    REMOVE_PROJECT,
    PROJECT_ERROR
} from '../../types'


const ProjectState = ({ children }) => {
    const initialState = {
        formproject : false,
        projects : [],
        errorform: false,
        project: null,
        message: null
    }

    const [state, dispatch] = useReducer(projectReducer, initialState)

    // Function que activa el formproject
    const showFormProject = () => {
        dispatch({
            type: SHOW_FORMPROJECT
        })
    }

    // Function que obtiene/trae los proyectos.
    const getProjects = () => {
        (async () => {
            try {
                const response = await retrieveProjects()
                dispatch({
                    type: GET_PROJECTS,
                    payload: response.data
                })
            } catch (error) {
                const alert = {
                    msg: 'There was a mistake',
                    category: 'alert-error'
                }
                dispatch({
                    type: PROJECT_ERROR,
                    payload: alert
                })
            }

        })()
               
    }
                 

    // Function que añade un nuevo proyecto a la lista
    const addProject = project => {
        (async () => {
            try {
                const response = await createProject(project)
                dispatch({
                    type: ADD_PROJECT,
                    payload: response.data
                })
                // Llamar a los proyectos.
                getProjects()

            } catch (error) {
                const alert = {
                    msg: 'There was a mistake',
                    category: 'alert-error'
                }
                dispatch({
                    type: PROJECT_ERROR,
                    payload: alert
                })
            }
        })()
        
    }

    // Function que muestra el error en el formproject
    const formError = () => {
        dispatch({
            type: FORM_VALIDATE
        })
    }

    // Function que pone un proyecto en activo
    const activeProject = project => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: project
        })
    }

    // Function que elimina un proyecto.
    const removeProject = id => {
        (async () => {
            try {
                await deleteProject(id)
                dispatch({
                    type: REMOVE_PROJECT,
                    payload: id
                })
            } catch (error) {
                const alert = {
                    msg: 'There was a mistake',
                    category: 'alert-error'
                }
                dispatch({
                    type: PROJECT_ERROR,
                    payload: alert
                })
            }
        })()
        
    }


    return ( 
        <projectContext.Provider
            value={{
                formproject: state.formproject,
                projects: state.projects,
                errorform: state.errorform,
                project: state.project,
                message: state.message,
                showFormProject,
                getProjects,
                addProject,
                formError,
                activeProject,
                removeProject
            }}>
            { children }
        </projectContext.Provider>
     )
}
 
export default ProjectState