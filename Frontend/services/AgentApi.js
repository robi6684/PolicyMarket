import axios from "axios"

export const getAgent = async (currentPage,size,token) => {
    let response = await axios.get('http://localhost:8086/agentapp/getAllAgents',
      {
        params: {
          pageno: currentPage-1,
          pagesize: size,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    
     )
     return response
}

export const deleteAgent = async (d,token) => {
    let response = await axios.delete(`http://localhost:8086/agentapp/delete/${d}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response

}

export const saveAgent = async (firstname,lastname,commission,uname,password,token) => {
  let response = await axios.post('http://localhost:8086/agentapp/save',{
      firstname,
      lastname,
      commission,
      user:{
          username:uname,
          password
      }
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response

}
