import { axiosClient } from '../config'

const retrieveTasks = (project) => {
    return (async () => {
        const response = await axiosClient.get(`/tasks/${project}`)

        return response
    })()
}

export default retrieveTasks