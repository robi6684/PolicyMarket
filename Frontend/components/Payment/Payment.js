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
import { getPayment, getPaymentFrom, getPaymentFromTo, getPaymentTo } from '../../services/PaymentApi'

const Payment = () => {
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
  const[fromdate,setFromdate] = useState(null)
  const[todate,setTodate] = useState(null)
  const navigation = useNavigate()


  const [currentPage, setCurrentPage] = useState(1);
  const [size,setSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const[dataError, setDataError] = useState({})

  const[fromTo,setFromTo] = useState(false)
  const[from,setFrom] = useState(false)
  const[to,setTo] = useState(false)

  const handlePageChange = async (clickValue) => {
    if(clickValue == "prev" && currentPage != 1)
    setCurrentPage(currentPage - 1)
    if(clickValue == "next" && currentPage != totalPages)
    setCurrentPage(currentPage + 1)
  }



  const authenticate =  () =>{
    if(!authenticateAdmin(username)) 
    navigation('/')
  }
  useEffect(() =>  {
    authenticate()
  },[])


  const getAllPayments = async () => {
    try {   
      let response = await getPayment(currentPage,size,token)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
      console.log(response.data)
    
    } catch (error) {
      setDataError(error.response.data)
    }

  }

  useEffect(() =>{
    if(fromTo){
      FromTo()
    }
    else if(from){
      From()
    }
    else if(to){
      To()
    }
    else
    getAllPayments()
  },[currentPage,size])


  const headers = ["Payment Type", "Date", "Amount", "Tax", "Total", "Username", "Policy Number"]
  const functions = []
  const functionHeaders = []

  const FromTo = async () =>{
    try {   
      let response = await getPaymentFromTo(currentPage,size,token,fromdate,todate)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
      console.log(response.data)
    
    } catch (error) {
      setDataError(error.response.data)
    }
  }
  const To = async () =>{
    try {   
      let response = await getPaymentTo(currentPage,size,token,todate)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
      console.log(response.data)
    
    } catch (error) {
      setDataError(error.response.data)
    }
  }
  const From = async () =>{
    try {   
      let response = await getPaymentFrom(currentPage,size,token,fromdate)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
      console.log(response.data)
    
    } catch (error) {
      setDataError(error.response.data)
    }
  }

  const handleSearch = async () =>{
    if((fromdate == null || typeof fromdate == 'undefined' || fromdate == '') &&
    (todate == null || typeof todate == 'undefined' || todate == '')){
      Swal.fire({  
        title: "Fields are empty",
        text: "Please fill either From Date or To Date or both",
        icon: "error",
        confirmButtonText: "OK", 
      })
      return
    }
    setCurrentPage(1)
    setSize(5)
    setTotalPages(0)

    if(fromdate == null || typeof fromdate == 'undefined' || fromdate == ''){
    
      setTo(true)
      To()
    }

    else if(todate == null || typeof todate == 'undefined' || todate == ''){
      setFrom(true)
      From()
    }
    else{
      setFromTo(true)
      FromTo()
    }


    

  }
  const handleReset = async () =>{
    window.location.reload(false)
    // await getAllPayments()
  }

  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Payments</h1>
   
     <div className='container'>
      <hr></hr>
      <div>
      <b>From</b> <input type="date" onChange={(e) => setFromdate(e.target.value)} value={fromdate}></input> <b>To</b> <input type="date" onChange={(e) => setTodate(e.target.value)} value={todate}></input>
      <br></br>
      <button className='btn btn-primary btn-sm mt-2' onClick={handleSearch}>Search</button>
      <button className='btn btn-primary btn-sm mt-2 mx-3'onClick={handleReset}>Reset</button>
      </div>
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
      <div className='selectBox mt-3'>
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
    </Form.Select><br></br>
    </div>
    
    
    
    <Table headers={headers} rowData={data} functions={functions} functionHeaders={functionHeaders}/>
    <hr></hr><br></br>
    </>
    }
    </div>
    
   </div>
  )
}

export default Payment
