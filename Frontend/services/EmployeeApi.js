import axios from "axios"

export const saveEmployee = async (firstname,lastname,salary,uname,password,token) => {
    let response = await axios.post('http://localhost:8086/employeeapp/save',{
        firstname,
        lastname,
        salary,
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

export const getEmployee = async (currentPage,size,token) => {
    let response = await axios.get('http://localhost:8086/employeeapp/getAllEmployees',
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

export const deleteEmployee = async (d,token) => {
    let response = await axios.delete(`http://localhost:8086/employeeapp/delete/${d}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response

}

export const updateSalary = async (employeeid,salary,token) => {
    let response = await axios.put(`http://localhost:8086/employeeapp/updateSalary/${employeeid}/${salary}`,{},{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })

      return response
}
