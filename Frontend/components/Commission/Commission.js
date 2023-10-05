import React from 'react'
import { useNavigate, useParams } from 'react-router'
import Error from '../sharedComponents/Error'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'


const Commission = () => {
  const username = useParams().username 
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")
  const[data,setData] = useState([])
  const navigation = useNavigate()
  let name = localStorage.getItem("name")

  const [currentPage, setCurrentPage] = useState(1);
  const [size,setSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const[dataError, setDataError] = useState({})

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const[accountnumber,setAccountNumber] = useState()
  const[ifsccode,setIfscCode] = useState()
  const[commissionid,setCommissionid] = useState()

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
  if(role == "ROLE_CUSTOMER"){
    navigation('/')
  }
  if(role == "ROLE_AGENT"){
    if(name != username){
      navigation('/')
    }
  }
},[])
 

  const getCommission = async () =>{
    if(token){
    try {
      let response = await axios.get(`http://localhost:8086/agentapp/commissions/${username}`,  {
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
      if(error.response.data.body == "Agent is null"){
        navigation('/')
      }
    }
  }
    
  }

  useEffect(() =>{
    getCommission()
  },[currentPage,size])

  const handleWithdraw  = (d) =>{
    setShow(true)
    setCommissionid(d.id)
  }

  const withdraw = async () =>{
    if(typeof accountnumber == 'undefined' || accountnumber == ''
    || typeof ifsccode == 'undefined' || ifsccode == ''){
      Swal.fire({  
        title: "Fields are empty",
        text: "Please fill the fields",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return
    }
    const isValidAccountNumber = /^[1-9]\d*$/.test(accountnumber);
    if(!isValidAccountNumber){
      Swal.fire({  
        title: "Incorrect Account Number",
        text: "Please fill the correct Account Number",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return

    }

    const isValidIFSCCode = /^[a-zA-Z0-9]+$/.test(ifsccode);
    if(!isValidIFSCCode){
      Swal.fire({  
        title: "Incorrect Ifsc Code",
        text: "Please fill the correct Ifsc code",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return

    }
    let response = await axios.post(`http://localhost:8086/commissionapp/save/${commissionid}`,{
    accountnumber,
    ifsccode
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    Swal.fire({  
      title: "Withdraw request sent successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(async () =>{
      setShow(false)
      await getCommission()
    })
  }


  let rowDataElements = data.map((d) =>{
    return(
        <tr>
            <td>{d.customerUsername}</td>
            <td>{d.customerFirstname}</td>
            <td>{d.policynumber}</td>
            <td>{d.date}</td>
            <td>{d.commission}</td>
            {role=="ROLE_AGENT"?<><td>{d.requeststatus == "Pending" ? <><button onClick={() => handleWithdraw(d)} className='btn btn-primary'>Withdraw</button></>:<>{d.requeststatus}</>}</td>
            <td>{d.withdrawstatus}</td></>:<></>}
            
        </tr>
    )
})

  return (
    <div className='background'>
    <NavBar role={role} username={name}/>
    {role=="ROLE_AGENT"?<></>:<><button class="button-arounder" onClick={() => navigation(-1)}>Go Back</button></>}
    <h1 className='heading'>Commissions</h1>
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
    <div>
      <table className="table">
    <thead>
      <tr>
        <th>Customer Username</th>
        <th>Customer First Name</th>
        <th>Policy No.</th>
        <th>Date</th>
        <th>Amount</th>
        {role=="ROLE_AGENT"?<><th>Withdraw</th>
        <th>Approval</th></>:<></>}
        
      </tr>
    </thead>
    <tbody >
      {rowDataElements}
    </tbody>
    </table>
    </div>
    <hr></hr><br></br>
    </div>
     </>
    }
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill the details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
              <Form.Label>Account Number*</Form.Label>
              <Form.Control type="text"  onChange={(e) => setAccountNumber(e.target.value)}
              />
              <Form.Label>IFSC Code*</Form.Label>
              <Form.Control type="text"  onChange={(e) => setIfscCode(e.target.value)}
              />           
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={withdraw}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  )
}

export default Commission
