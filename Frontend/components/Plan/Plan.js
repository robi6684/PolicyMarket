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
import { getPlan, savePlan, updatePlan } from '../../services/PlanApi'
import axios from 'axios'

const Plan = () => {
  const username = useParams().username
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("auth")

  const[data,setData] = useState([])
  const[planname,setPlanname] = useState('')
  const navigation = useNavigate()

  const [modalshow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [planid,setPlanid] = useState()

  const [currentPage, setCurrentPage] = useState(1);
  const [size,setSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const[dataError, setDataError] = useState({})
//   const[planid,setPlanid] = useState()

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
      let response = await axios.get(`http://localhost:8086/planapp/get/${searchname}`)
      const arr = []
      arr.push(response.data)
      setData(arr)
    } catch (error) {
      setDataError(error.response.data)
    }
   
    
  }




//   const authenticate =  () =>{
//     if(!authenticateAdmin())
//     navigation('/')
//   }
//   useEffect(() =>  {
//     authenticate()
//   },[])

  const getAllPlans = async () => {
    try {   
      let response = await getPlan(currentPage,size,token)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
      console.log(data)
    
    } catch (error) {
      setDataError(error.response.data)
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
    const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidName = namePattern.test(planname);
    if(!isValidName){
      Swal.fire({  
        title: "Invalid Plan Name",
        text: "Please enter correct plan name",
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
      }).then(async function() {
        handleModalClose()
        await getAllPlans()
      });

      
    } catch (error) {
      Swal.fire({  
        title: "Plan Already Exists",
        icon: "error",
        confirmButtonText: "OK", 
      });
      
    }

  }

  const handleScheme = (d) =>{
    navigation(`/scheme/${username}/${d.planid}`)
  }

  const handleUpdate = async (d) =>{
    setPlanid(d.planid)
    setPlanname(d.planname)
    setShow(true)

  }

  const update = async () =>{
    if(typeof planname === 'undefined' || planname === ''){
      Swal.fire({  
          title: "Fields are empty",
          text: "Please fill the fields",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
  }
    const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidName = namePattern.test(planname);
    if(!isValidName){
      Swal.fire({  
        title: "Invalid Plan Name",
        text: "Please enter correct plan name",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
   
  try {
    await updatePlan(planname,token,planid)
    Swal.fire({  
      title: "Plan Updated Successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(async function() {
      handleClose()
      await getAllPlans()
    });
    
  } catch (error) {
    Swal.fire({  
      title: "Plan Already Exists",
      icon: "error",
      confirmButtonText: "OK", 
    });
    
  }

  }

  const headers = ["Plan Name"]
  const functions = []
  const functionHeaders = []
  if(role == "ROLE_ADMIN"){
    functionHeaders.push("View Schemes","Update")
    functions.push(handleScheme,handleUpdate)
  }

  else{
    functionHeaders.push("View Schemes")
    functions.push(handleScheme)
  }

  

  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Plans</h1>
    
     <div className='container'>
      <hr></hr>
      <input type='text' placeholder='Plan Name' onChange={(e) => setSearchname(e.target.value)}></input>
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
      <div className='selectBox mt-2'>
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
    </>}
    {role=="ROLE_ADMIN" ?<>
    <Button className='button' variant="primary" onClick={() => {
     setPlanid('')
     setPlanname('')
     setModalShow(true)
    }} style={{marginLeft:'40%'}}> Add New Plan</Button>
    </>:<><hr></hr><br></br></>}
    </div>
     
  
   
    <Modal show={modalshow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <Form.Label>Plan Name*</Form.Label>
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <Form.Label>Plan Name*</Form.Label>
        <Form.Control type="text"  onChange={(e) => setPlanname(e.target.value)}
        value={planname}
        />          
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

export default Plan
