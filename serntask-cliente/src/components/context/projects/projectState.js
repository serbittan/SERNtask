import React, { useReducer } from 'react'
import { projectReducer, projectContext } from '.'
import { createProject, retrieveProjects, deleteProject, updateProject } from '../../../logic'



import { 
    SHOW_FORMPROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_VALIDATE,
    CURRENT_PROJECT,
    REMOVE_PROJECT,
    PROJECT_ERROR,
    SELECTED_PROJECT,
    UPDATE_PROJECT,
    CLEAN_PROJECT
} from '../../types'


const ProjectState = ({ children }) => {
    const initialState = {
        formproject : false,
        projects : [],
        errorform: false,
        project: null,
        projectselected: null,
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

    // Function que selecciona un project para edición.
    const selectedProject = project => {
        
        dispatch({
            type: SELECTED_PROJECT,
            payload: project
        })
    }

    // Function que actualiza el nombre de un projecto.
    const handleUpdateProject = project => {
        (async () => {
            try {
                const response = await updateProject(project)
                dispatch({
                    type: UPDATE_PROJECT,
                    payload: response.data
                })
                
                // Function que setea el projectselected pasado unos segundos.
                setTimeout(() => {
                    cleanProject()
                },1500)

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

    // Function que limpia el projectselected después de actualizar proyecto.
    const cleanProject = () => {
        dispatch({
            type: CLEAN_PROJECT
        })
    }

    


    return ( 
        <projectContext.Provider
            value={{
                formproject: state.formproject,
                projects: state.projects,
                errorform: state.errorform,
                project: state.project,
                projectselected: state.projectselected,
                message: state.message,
                showFormProject,
                getProjects,
                addProject,
                formError,
                activeProject,
                removeProject,
                selectedProject,
                handleUpdateProject,
                cleanProject
            }}>
            { children }
        </projectContext.Provider>
     )
}
 
export default ProjectState