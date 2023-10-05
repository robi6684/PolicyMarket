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
import { getClaim } from '../../services/ClaimApi'
import axios from 'axios'

const Claim = () => {
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
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

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
    if(!(authenticateAdmin(username))){
      navigation(`/`)
    }
  }
 
  useEffect(() =>{
    authenticate()
  },[])

  const getAllClaims = async () => {
    try {   
      let response = await getClaim(currentPage,size,token)
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



  const update = async (d) =>{
      let response = await axios.put(`http://localhost:8086/claimapp/updateStatus/${d.id}`,{},{
          headers:{
              Authorization: `Bearer ${token}`
          }
      })
      Swal.fire({  
        title: "Claim approved successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(async function() {
        await getAllClaims()
      });  

  }


  let rowDataElements = data.map((d) =>{
    return(
        <tr>
            <td>{d.username}</td>
            <td>{d.policyNumber}</td>
            <td>{d.amount}</td>
            <td>{d.accountnumber}</td>
            <td>{d.ifsccode}</td>
            <td>{d.date}</td>
            <td>{d.status}</td>
            {d.status=="Verified"?<><td>Approved</td></>:<>
            <td>
            <Button variant='success' onClick={() => update(d)}>Approve</Button>
            </td>
            </>}
            
        </tr>
    )
})

  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Claims</h1>
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
        <th>Policy No.</th>
        <th>Amount</th>
        <th>A/C No.</th>
        <th>IFSC Code</th>
        <th>Date</th>
        <th>Status</th>
        <th>Approval</th>
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
              <Form.Label>New Salary</Form.Label>
              <Form.Control type="text"  onChange={(e) => setSalary(e.target.value)}
              value={salary}/>          
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={update}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

   </div>
  )
}

export default Claim
