import axios from 'axios'
const baseAdress = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseAdress, credentials)
  return response.data
}

export default { login }