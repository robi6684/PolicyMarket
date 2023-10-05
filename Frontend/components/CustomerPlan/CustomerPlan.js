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
import { getPlan, savePlan } from '../../services/PlanApi'

const CustomerPlan = () => {
  const username = useParams().username
  const token = localStorage.getItem("auth")

  const[data,setData] = useState([])
  const[planname,setPlanname] = useState()
  const navigation = useNavigate()

  const [modalshow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);

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
    if(!authenticateAdmin())
    navigation('/')
  }
  useEffect(() =>  {
    authenticate()
  },[])

  const getAllPlans = async () => {
    if(authenticateAdmin()){
    try {   
      let response = await getPlan(currentPage,size,token)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
    
    } catch (error) {
      setDataError(error.response.data)
    }
  }

  }

  useEffect(() =>{
    getAllPlans()
  },[currentPage,size])

  


  const handleAddPlan = async () =>{
    if(typeof planname === 'undefined' || planname === ''){
        Swal.fire({  
            title: "Fields are empty",
            text: "Please fill the fields",
            icon: "error",
            confirmButtonText: "OK", 
          });  
          return;
    }
    try {
      await savePlan(planname,token)
      Swal.fire({  
        title: "Plan Added Successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(function() {
        window.location.reload(false)
      });  
      
    } catch (error) {
      Swal.fire({  
        title: "Plan Already Exists",
        icon: "error",
        confirmButtonText: "OK", 
      });
      
    }

  }

  const handleScheme = () =>{

  }

  const handleUpdate = () =>{

  }

  const headers = ["Plan Name"]
  const functions = [handleScheme,handleUpdate]
  const functionHeaders = ["View Schemes"]

  return (
    <div className='background'>
    <NavBar role={"admin"} username={username}/>
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
    </div>
     </>
    }
    <Button className='button' variant="primary" onClick={() => {
     setPlanname('')
     setModalShow(true)
    }} style={{marginLeft:'45%'}}> Add New Plan</Button>

    <Modal show={modalshow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <Form.Label>Plan Name</Form.Label>
        <Form.Control type="text"  onChange={(e) => setPlanname(e.target.value)}
        />           
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddPlan}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>

   
   </div>
  )
}

export default CustomerPlan
