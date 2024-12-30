import axios from 'axios-typescript'



const API_URL = 'http://localhost:8000/api/auth'


export const registerUser = async(username: string, password:string) => {
    return await axios.post(`${API_URL}/register`, {username, password})
}


export const loginUser = async(username:string, password:string) => {
    return await axios.post(`${API_URL}/login`, {username, password})
}