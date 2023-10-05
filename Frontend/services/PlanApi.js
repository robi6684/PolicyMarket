import axios from "axios"

export const getPlan = async (currentPage,size,token) =>{
    let response = await axios.get('http://localhost:8086/planapp/getAllPlans',
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

export const savePlan = async (planname,token) => {
    let response = await axios.post('http://localhost:8086/planapp/save',{
       planname
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response
}

export const updatePlan = async (planname,token,planid) => {
  let response = await axios.put(`http://localhost:8086/planapp/update/${planid}`,{
     planname
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response
}