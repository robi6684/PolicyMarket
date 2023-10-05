import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../sharedComponents/Error'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import { Button, Modal, Form } from 'react-bootstrap'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import { authenticateAdmin, authenticateEmployee } from '../../services/Authentication'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { deleteAgent, getAgent, saveAgent } from '../../services/AgentApi'
import axios from 'axios'
import { Spinner } from '../Spinner';

const EmployeeQuery = () => {
  const username = useParams().username
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")

  const[data,setData] = useState([])
  const[email, setEmail] = useState()
  const[content,setContent] = useState()
  const[id,setId] = useState()
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

  const [modalshow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);

  const authenticate =  () =>{
    if(!authenticateEmployee(username)) 
    navigation('/')
  }
  useEffect(() =>  {
    authenticate()
  },[])

  const getAllQueries = async () => {

    try {   
        let response = await axios.get('http://localhost:8086/queryapp/getAllQuery',
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
      console.log(response.data)
    
    } catch (error) {
      setDataError(error.response.data)
    }

  }

  useEffect(() =>{
    getAllQueries()
  },[currentPage,size])

  let rowDataElements = data.map((d) =>{
    return(
        <tr>
            <td>{d.email}</td>
            <td>{d.content}</td>
            <td>{d.date}</td>
            <td>{d.status == "Replied" ? <>{d.status}</>:<><button onClick={() => handleReply(d)} className='btn btn-primary'>Reply</button></>}</td>
        </tr>
    )
})

  const handleReply = async (d) =>{
    setModalShow(true)
    setEmail(d.email)
    setId(d.queryid)
  }

  const [loading,setLoading] = useState(true)
  const reply = async () =>{
    setLoading(false)
    if(typeof content == 'undefined' || content == ''){
    Swal.fire({  
      title: "Fields are empty",
      text: "Please fill the fields",
      icon: "error",
      confirmButtonText: "OK", 
    }).then(() =>{
      setLoading(true)
    })
    return;
    }
    let response = await axios.post(`http://localhost:8086/employeeapp/reply/${id}/${email}/${content}`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )
    if(response.data){
        setLoading(true)
      }
     
    Swal.fire({  
        title: "Reply Sent Successfully",
        icon: "success",
        confirmButtonText: "OK", 
    }).then(async() => {setModalShow(false)
    await getAllQueries()});  
 
  }

  return (
    <>
    {loading?
    <>
     <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Queries</h1>
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
        <th>Sender Email</th>
        <th>Query</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody >
      {rowDataElements}
    </tbody>
    </table>
    </div>
    </div>
     </>
    }

    <Modal show={modalshow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >  
        <Form.Label>Your Message*</Form.Label>
        <textarea name="content" placeholder="Enter message here"  onChange={(e) =>{setContent(e.target.value)}} rows="2" required></textarea>     
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={reply}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>


   </div>
    </>:
    <>
    <NavBar role={role} username={username}/><Spinner/>
    </>}
   
   </>
  )
}

export default EmployeeQuery

