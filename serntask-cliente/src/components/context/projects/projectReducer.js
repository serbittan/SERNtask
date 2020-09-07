import {
    SHOW_FORMPROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_VALIDATE
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
        default:
            return state
    }
}
 
export default projectReducer