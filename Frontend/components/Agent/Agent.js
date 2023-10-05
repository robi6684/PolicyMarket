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
import { deleteAgent, getAgent, saveAgent } from '../../services/AgentApi'
import axios from 'axios'

const Agent = () => {
  const username = useParams().username
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")

  const[data,setData] = useState([])
  const[firstname, setFirstName] = useState()
  const[lastname,setLastName] = useState()
  const[commission,setCommission] = useState()
  const[uname, setUsername] = useState()
  const[password,setPassword] = useState()
  const[agentid,setAgentid] = useState()
  const navigation = useNavigate()

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

  const [modalshow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);

  const authenticate = () =>{
    if(localStorage.getItem("name") !== username)
    navigation('/')
  }
  useEffect(() =>{
    authenticate()
  },[])


  // const authenticate = () =>{
  //   if(localStorage.getItem("name") !== username)
  //   navigation('/')
  // }
  // useEffect(() =>{
  //   authenticate()
  // },[])


  const getAllAgents = async () => {

    try {   
      let response = await getAgent(currentPage,size,token)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
    
    } catch (error) {
      setDataError(error.response.data)
    }

  }

  useEffect(() =>{
    getAllAgents()
  },[currentPage,size])

  const handleDelete = (d) => {
    setAgentid(d.agentid)
    setUsername(d.username)
    setShow1(true)
    
  }

  const remove = async () =>{
    await deleteAgent(agentid,token)
    Swal.fire({  
      title: "Agent Deleted Successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(function() {
      window.location.reload(false)
    }); 
  }


  const viewCustomers = (d) =>{
    navigation(`/commission/${d.username}`)

  }

  const handleAddAgent = async () =>{
    if(typeof firstname === 'undefined' || firstname === ''
    || typeof lastname === 'undefined' || lastname === '' 
    || typeof uname === 'undefined' || uname === '' 
    || typeof password === 'undefined' || password === ''){
        Swal.fire({  
            title: "Fields are empty",
            text: "Please fill the fields",
            icon: "error",
            confirmButtonText: "OK", 
          });  
          return;
    }
    const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
      const isValidfirstName = namePattern.test(firstname);
      if(!isValidfirstName){
        Swal.fire({  
          title: "Invalid First Name",
          text: "Please enter correct First name",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
      }
      const isValidlastName = namePattern.test(lastname);
      if(!isValidlastName){
        Swal.fire({  
          title: "Invalid Last Name",
          text: "Please enter correct Last name",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
      }
    try {
      await saveAgent(firstname,lastname,commission,uname,password,token)
      Swal.fire({  
        title: "Agent Added Successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(async function() {
        handleModalClose()
        await getAllAgents()
      });  
      
    } catch (error) {
      Swal.fire({  
        title: "Agent Already Exists",
        icon: "error",
        confirmButtonText: "OK", 
      });
      
    }


  }


  const headers = ["Username", "First Name", "Last Name", "Total Commission"]
  const functions = [viewCustomers]
  const functionHeaders = ["View Commissions"]

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
      let response = await axios.get(`http://localhost:8086/agentapp/get/${searchname}`)
      console.log(response.data)
      const arr = []
      arr.push(response.data)
      setData(arr)
    } catch (error) {
      setDataError(error.response.data)
    }
   
    
  }

  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <h1 className='heading'>Agents</h1>
    
     
     <div className='container'>
     <hr></hr>
     <input type='text' placeholder='Username' onChange={(e) => setSearchname(e.target.value)}></input>
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
    </>
    }
    {role=="ROLE_EMPLOYEE" ?<>
    <Button className='button' variant="primary" onClick={() => {
      setModalShow(true)
      setFirstName('')
      setLastName('')
      setCommission(0)
      setUsername('')
      setPassword('')
    }} style={{marginLeft:'40%'}}> Add New Agent</Button>
    </>:<><hr></hr><br></br></>}
    </div>
     

   

    <Modal show={modalshow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <Form.Label>First Name*</Form.Label>
        <Form.Control type="text"  onChange={(e) => setFirstName(e.target.value)}
        />     
        <Form.Label>Last Name*</Form.Label>
        <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} 
        />     
        <Form.Label>Username*</Form.Label>
        <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} 
        /> 
        <Form.Label>Password*</Form.Label>
        <Form.Control type="text" onChange={(e) => setPassword(e.target.value)} 
        />       
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddAgent}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>


  <Modal show={show1} onHide={handleClose1}  
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Are you sure want to delete ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      Remove agent : {uname}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
          No
        </Button>
        <Button variant="primary" onClick={remove}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
   </div>
  )
}

export default Agent

