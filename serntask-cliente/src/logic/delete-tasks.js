import { axiosClient } from '../config'

const deleteTasks = (id, project) => {
    return (async () => {
        await axiosClient.delete(`/tasks/delete/${project}/${id}`)

        return 
    })()
}

export default deleteTasks