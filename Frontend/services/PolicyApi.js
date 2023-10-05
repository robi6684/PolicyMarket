import axios from "axios"

export const getPolicy = async (currentPage,size,token,username) => {
    let response = await axios.get(`http://localhost:8086/policyapp/getAllPolicies/${username}`,
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