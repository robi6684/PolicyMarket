import axios from "axios"

export const getClaim = async (currentPage,size,token) => {
    let response = await axios.get('http://localhost:8086/claimapp/getAllClaims',
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