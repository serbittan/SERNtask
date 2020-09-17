import { axiosClient } from '../config'

const createProject = data => {
    return (async () => {
        const response = await axiosClient.post('/projects', data)

        return response

    })()
}

export default createProject