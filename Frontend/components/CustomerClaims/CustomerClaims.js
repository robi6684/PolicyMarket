import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../sharedComponents/Error'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import { Button, Modal, Form } from 'react-bootstrap'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import { authenticateAdmin, authenticateCustomer } from '../../services/Authentication'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { getClaim } from '../../services/ClaimApi'
import axios from 'axios'

const CustomerClaims = () => {
  const username = useParams().username
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")

  const[data,setData] = useState([])
  const navigation = useNavigate()

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

  const authenticate =  () =>{
    if(!authenticateCustomer(username)) 
    navigation('/')
  }
  useEffect(() =>  {
    authenticate()
  },[]) 


  const getAllClaims = async () => {
    try {   
        let response = await axios.get(`http://localhost:8086/claimapp/getClaims/${username}`,
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
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
    
    } catch (error) {
      setDataError(error.response.data)
    }

  }

  useEffect(() =>{
    getAllClaims()
  },[currentPage,size])



  const headers = ["Customer Username","Policy Number","Amount", "A/C No.", "IFSC Code", "Date", "Status"]
  const functions = []
  const functionHeaders = []

  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Claims</h1>
    {Object.keys(dataError).length !==0 ?
     <><Error error={dataError}></Error></>:
     <>
     <div className='container'>
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
    <hr></hr><br></br>
    </div>
     </>
    }
   </div>
  )
}

export default CustomerClaims
