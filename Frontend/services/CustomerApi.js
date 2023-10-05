import axios from "axios"

export const getCustomer = async (currentPage,size,token) => {
    let response = await axios.get('http://localhost:8086/customerapp/getAllCustomers',
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

export const deleteCustomer = async (d,token) => {
    // let response = await axios.delete(`http://localhost:8086/employeeapp/delete/${d.employeeid}`,{
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   return response

}
