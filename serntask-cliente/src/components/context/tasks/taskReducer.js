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


const taskReducer = (state, action) => {
    switch(action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasksproject: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                tasksproject: [action.payload, ...state.tasksproject],
                errorTask: false
            }
        case TASK_VALIDATE:
            return {
                ...state,
                errorTask: true
            }

        // case STATUS_TASK:
        //     return {
        //         ...state,
        //         task: action.payload
        //     }

        case DELETE_TASK:
            return {
                ...state,
                tasksproject: state.tasksproject.filter(task => task.id !== action.payload),
            }

        case TASK_SELECTED:
            return {
                ...state,
                taskselected: action.payload
            }

        case UPDATE_TASK: 
            return {
                ...state,
                tasksproject: state.tasksproject.map(task => task.id === action.payload.id ? action.payload : task)
            }

        case CLEAN_TASK:
            return {
                ...state,
                taskselected: null
            }
        default:
            return state
    }
}

export default taskReducer