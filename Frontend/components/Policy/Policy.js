import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import Pagination from '../sharedComponents/Pagination'
import Error from '../sharedComponents/Error'
import { useEffect } from 'react'
import { getPolicy } from '../../services/PolicyApi'
import Table from '../sharedComponents/Table'

const Policy = () => {
    const username = useParams().username
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")
  const [data,setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [size,setSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const[dataError, setDataError] = useState({})
  const navigation = useNavigate()
  let name = localStorage.getItem("name")

  const handlePageChange = async (clickValue) => {
    if(clickValue == "prev" && currentPage != 1)
    setCurrentPage(currentPage - 1)
    if(clickValue == "next" && currentPage != totalPages)
    setCurrentPage(currentPage + 1)
  }

  useEffect(()=>{
    if(!token){
      navigation('/')
    }
    if(role == "ROLE_AGENT"){
      navigation('/')
    }
    if(role == "ROLE_CUSTOMER"){
      if(name != username){
        navigation('/')
      }
    }
  },[])

  const getAllPolicies = async () =>{
    try {   
        let response = await getPolicy(currentPage,size,token,username)
        setData(response.data.content)
        setCurrentPage(Math.min(currentPage,response.data.totalPages))
        setTotalPages(response.data.totalPages)
      } catch (error) {
        if(error.response.data){
        if(error.response.data.body == "Customer is null"){
          navigation('/')
        }
        setDataError(error.response.data)
      }
      else{
        navigation('/')
      }
    }
  }

  useEffect(() =>{
    getAllPolicies()
  },[currentPage,size])

  const handlePremium = (d) =>{
    navigation(`/premium/${username}/${d.policynumber}`)
  }

  const headers = ["Scheme Name" ,"Policy No.", "Issue Date", "Maturity Date", "Premium Type", "Premium Amount"]
  const functions = []
  const functionHeaders = []

  if(role=="ROLE_CUSTOMER"){
    functions.push(handlePremium)
    functionHeaders.push("Pay Premium")
  }
  return (
    <div className='background'>
    <NavBar role={role} username={name}/>
    {role=="ROLE_CUSTOMER"?<></>:<><button class="button-arounder" onClick={() => navigation(-1)}>Go Back</button></>}
    <h1 className='heading'>Policies</h1>
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
    <hr></hr><br/>
    </div>
     </>
    }
   </div>
  )
}

export default Policy
