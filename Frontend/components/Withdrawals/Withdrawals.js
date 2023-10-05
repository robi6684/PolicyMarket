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
import { authenticateAdmin } from '../../services/Authentication'


const Withdrawals = () => {
  const username = useParams().username 
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")
  const[data,setData] = useState([])
  const navigation = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);
  const [size,setSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const[dataError, setDataError] = useState({})

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const[commissionid,setCommissionid] = useState()

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

  const getWithdrawal = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/commissionapp/get`,  {
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
    getWithdrawal()
  },[currentPage,size])

  const handleApprove  = (d) =>{
    setShow(true)
    setCommissionid(d.id)
  }

  const approve = async () =>{
    let response = await axios.put(`http://localhost:8086/commissionapp/update/${commissionid}`,{

    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    Swal.fire({  
      title: "Withdraw request approved successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(async () =>{
      setShow(false)
      await getWithdrawal()
    })
  }


  let rowDataElements = data.map((d) =>{
    return(
        <tr>
            <td>{d.agentname}</td>
            <td>{d.customername}</td>
            <td>{d.policynumber}</td>
            <td>{d.date}</td>
            <td>{Math.ceil(d.commission)}</td>
            <td>{d.status == "Pending" ? <><button onClick={() => handleApprove(d)} className='btn btn-primary'>Approve</button></>:<>{d.status}</>}</td>
        </tr>
    )
})

  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Commission Withdrawals</h1>
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
        <th>Agent Name</th>
        <th>Customer Name</th>
        <th>Policy No.</th>
        <th>Date</th>
        <th>Commission</th>
        <th>Status</th>
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
    <Modal show={show} onHide={handleClose}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to approve ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={approve}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  )
}

export default Withdrawals
