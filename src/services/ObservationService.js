import axios from 'axios'

const baseUrl = '/observation' //'https://weather-backend-ha.herokuapp.com/observation'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const send = async (observation) => {
    const response = await axios.post(baseUrl, observation)
    return response.data
}

export default {getAll, send}