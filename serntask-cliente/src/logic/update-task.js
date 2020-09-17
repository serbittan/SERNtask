import { axiosClient } from '../config'

const updateTask = task => {
    const { id, project } = task
   
    return (async () => {
        const response = await axiosClient.put(`/tasks/${project}/${id}`, task)
    
        return response

    })()
}

export default updateTask