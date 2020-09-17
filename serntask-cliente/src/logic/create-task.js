import { axiosClient } from '../config'

const createTask = task => {
    return (async () => {
        await axiosClient.post('/tasks', task)
        
        return 
    })()
}

export default createTask