import {
    GET_TASKS,
    ADD_TASK
} from '../../types'


const taskReducer = (state, action) => {
    switch(action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasksproject: state.tasks.filter(task => task.projectId === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        default:
            return state
    }
}

export default taskReducer