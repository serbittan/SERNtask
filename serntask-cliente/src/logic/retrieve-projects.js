import { axiosClient } from '../config'

const retrieveProjects = () => {
    return (async () => {
        const response = await axiosClient.get('/projects')

        return response

    })()
}

export default retrieveProjects

