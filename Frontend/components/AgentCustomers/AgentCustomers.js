import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import axios from "axios"
import { useState } from 'react'
import Error from '../sharedComponents/Error'
import Table from '../sharedComponents/Table'
import Pagination from '../sharedComponents/Pagination'
import { Form } from 'react-bootstrap'
import { authenticateAgent } from '../../services/Authentication'

const AgentCustomers = () => {

    const role = localStorage.getItem("role")
    const username = useParams().username
    const token = localStorage.getItem("auth")
    const navigation = useNavigate()

  

    const [currentPage, setCurrentPage] = useState(1);
    const [size,setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const[dataError, setDataError] = useState({}) 
    const[data,setData] = useState([])

    const handlePageChange = async (clickValue) => {
      if(clickValue == "prev" && currentPage != 1)
      setCurrentPage(currentPage - 1)
      if(clickValue == "next" && currentPage != totalPages)
      setCurrentPage(currentPage + 1)
    }

    const handleCustomer = () =>{
      navigation(`/register/${username}`)
    }
    const authenticate =  () =>{
      if(!authenticateAgent(username))
      navigation('/')
    }
    useEffect(() =>  {
      authenticate()
    },[])

    const getCustomers = async () =>{
      try {
        let response = await axios.get(`http://localhost:8086/agentapp/getCustomers/${username}`,{
          params: {
            pageno: currentPage-1,
            pagesize: size,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
      } catch (error) {
        setDataError(error.response.data)
      }
     
    }
    useEffect(() =>{
        getCustomers()
    },[currentPage,size])

    const documentUpload = () =>{

    }

    const registerPolicy = () =>{

    }

  const headers = ["Username", "First Name", "Policy Number", "Document Status"]
  const functions = []
  const functionHeaders = []
  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Customers</h1>
    {Object.keys(dataError).length !==0 ?
     <><Error error={dataError}></Error></>:
     <>
     <div className='container'>
     <hr></hr>
      <Pagination
           currentPage={currentPage}
           totalPages = {totalPages}
          onPageChange={handlePageChange}
          />
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
    </div>


     </> 
    }
    <button className='button' style={{marginLeft:'40%'}} onClick={handleCustomer}>Register New Customer</button>
    </div>
  )
}

export default AgentCustomers
