import {
    SHOW_FORMPROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_VALIDATE,
    CURRENT_PROJECT,
    REMOVE_PROJECT
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
                projects: action.payload
            }

        case ADD_PROJECT:
            return {
                ...state,
                projects: [ action.payload, ...state.projects],
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
        default:
            return state
    }
}
 
export default projectReducer