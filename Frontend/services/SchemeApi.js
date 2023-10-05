import axios from "axios"
import { trackPromise } from "react-promise-tracker"

export const getScheme= async (currentPage,size,planid,token) =>{
    let response = await axios.get(`http://localhost:8086/schemeapp/getAllSchemes/${planid}`,
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