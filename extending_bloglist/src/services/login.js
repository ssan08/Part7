import axios from 'axios'
const baseUrl = '/api/login'
const baseUrl1 = '/api/users'


const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl1)
  return request.then(response => response.data)
}



export default { login, getAll }
