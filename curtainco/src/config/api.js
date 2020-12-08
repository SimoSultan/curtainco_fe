import axios from 'axios'

// Create an axios instance
export default axios.create({
  baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
  timeout: 5000
})