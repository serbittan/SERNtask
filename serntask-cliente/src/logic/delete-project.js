import { axiosClient } from '../config'

const deleteProject = projectId => {
    return (async () => {
        await axiosClient.delete(`/projects/delete/${projectId}`)

        return 
    })()
}

export default deleteProject
