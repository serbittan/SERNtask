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


const projectReducer = (state, action) => {
    switch(action.type) {
        case SHOW_FORMPROJECT:
            return {
                ...state,
                formproject: true
            }

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            }

        case ADD_PROJECT:
            return {
                ...state,
                projects: [ ...state.projects, action.payload],
                formproject: false,
                errorform: false
            }

        case FORM_VALIDATE:
            return {
                ...state,
                errorform: true
            }

        case CURRENT_PROJECT:
            return {
                ...state,
                project: action.payload  // otra opción sería utilizar un filter
            }

        case REMOVE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }

        case PROJECT_ERROR:
            return {
                ...state,
                message: action.payload
            }

        case SELECTED_PROJECT:
            return {
                ...state,
                formproject: true,
                projectselected: action.payload,
                project: null
            }

        case UPDATE_PROJECT:
            return {
                ...state,
                projectselected: action.payload,
                formproject: false 
            }

        case CLEAN_PROJECT:
            return {
                ...state,
                projectselected: null
            }

        default:
            return state
    }
}
 
export default projectReducer