import axios from "axios"

// Create an axios instance
export default axios.create({
    baseURL: "http://localhost:5000/api", // development
    // baseURL: "https://curtainco.herokuapp.com/api", // production
    //   baseURL: 'heroku server',
    withCredentials: true,
    timeout: 5000,
})
