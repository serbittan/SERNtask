import { axiosClient } from '../config'

const updateProject = project => {
    const { id } = project

    return (async () => {
        const response = await axiosClient.put(`projects/${id}`, project)

        return response
    })()
}

export default updateProject