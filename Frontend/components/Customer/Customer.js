import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../sharedComponents/Error'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import { Button, Modal, Form } from 'react-bootstrap'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import { authenticateAdmin } from '../../services/Authentication'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { deleteCustomer, getCustomer } from '../../services/CustomerApi'
import axios from 'axios'

const Customer = () => {
  const username = useParams().username
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")

  const[data,setData] = useState([])
  const[firstname, setFirstName] = useState()
  const[lastname,setLastName] = useState()
  const[salary,setSalary] = useState()
  const[uname, setUsername] = useState()
  const[password,setPassword] = useState()
  const[employeeid,setEmployeeid] = useState()
  const navigation = useNavigate()

  const [modalshow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [size,setSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const[dataError, setDataError] = useState({})

  const handlePageChange = async (clickValue) => {
    if(clickValue == "prev" && currentPage != 1)
    setCurrentPage(currentPage - 1)
    if(clickValue == "next" && currentPage != totalPages)
    setCurrentPage(currentPage + 1)
  }

  const authenticate = () =>{
    if(localStorage.getItem("name") !== username)
    navigation('/')
  }
  useEffect(() =>{
    authenticate()
  },[])




  const getAllCustomers= async () => {
    try {   
      let response = await getCustomer(currentPage,size,token)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
    
    } catch (error) {
      setDataError(error.response.data)
    }
}

  useEffect(() =>{
    getAllCustomers()
  },[currentPage,size])

  const handleDelete = async (d) => {
    await deleteCustomer(d,token)
    Swal.fire({  
      title: "Customer Deleted Successfully",
      icon: "success",
      confirmButtonText: "OK", 
    });
    await getAllCustomers()
  }

  const handleDocuments = (d) =>{
    navigation(`/documents/${username}/${d.customerid}`)
  }

  const handlePolicies = (d) =>{
    navigation(`/policy/${d.username}`)
  }


  const headers = ["Username", "First Name", "Email"]
  const functions = [handleDocuments,handlePolicies]
  const functionHeaders = ["View Documents", "View Policies"]
  const [searchname,setSearchname] = useState('')
  const handleSearch = async () =>{
    if(searchname == ''){
      Swal.fire({  
        title: "Fields are empty",
        text: "Please fill the fields",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return
    }
    try {
      let response = await axios.get(`http://localhost:8086/customerapp/get/${searchname}`)
      console.log(response.data)
      const arr = []
      arr.push(response.data)
      setData(arr)
    } catch (error) {
      setDataError(error.response.data)
    }
   
    
  }

  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Customers</h1>
    
     <div className='container'>
      <hr></hr>
      <input type='text' placeholder='Username' onChange={(e) => setSearchname(e.target.value)}></input>
      <button className='btn btn-sm btn-primary mx-2' onClick={handleSearch}>Search</button>
      <button className='btn btn-sm btn-primary mx-2' onClick={() => window.location.reload(false)}>Reset</button>
      {Object.keys(dataError).length !==0 ?
     <><Error error={dataError}></Error></>:
     <>
     <div className='mt-3'>
      <Pagination
           currentPage={currentPage}
           totalPages = {totalPages}
          onPageChange={handlePageChange}
          />
          </div>
      <div className='selectBox'>
      <Form.Label>Items per page</Form.Label>
      <Form.Select size="sm" className='box' aria-label="Default select example" onChange={(e) => {
      setSize(e.target.value)
    }} value={size}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </Form.Select>
    </div>
    
    <Table headers={headers} rowData={data} functions={functions} functionHeaders={functionHeaders}/>
    <hr></hr><br></br></>
  }
    </div>
     
   </div>
  )
}

export default Customer
