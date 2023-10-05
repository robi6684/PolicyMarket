import axios from "axios"

export const login = async (username,password) =>{
    let response = await axios.post('http://localhost:8086/api/auth/login',{
        username,
        password
    })
    return response   
}
