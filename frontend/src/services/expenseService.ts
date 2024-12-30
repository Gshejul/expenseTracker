import axios from 'axios'


const API_URL = 'http://localhost:8000/api/expenses'


export const fetchExpenses = async (token:string) => {
    return await axios.get(API_URL, {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
}


export const createExpense = async (token:string, amount:number, description:string) => {
    return await axios.post(API_URL, {amount, description}, {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
}