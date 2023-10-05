import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../sharedComponents/Error'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import { Button, Modal, Form } from 'react-bootstrap'
import NavBar from '../sharedComponents/NavBar'
import './Employee.css'
import { useState } from 'react'
import { authenticateAdmin } from '../../services/Authentication'
import { deleteEmployee, getEmployee, saveEmployee, updateSalary } from '../../services/EmployeeApi'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import axios from 'axios'

const Employee = () => {
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



  const authenticate =  () =>{
    if(!authenticateAdmin(username))
    navigation('/')
  }
  useEffect(() =>  {
    authenticate()
  },[])

  const getAllEmployees = async () => {
    try {   
      let response = await getEmployee(currentPage,size,token)
      setData(response.data.content)
      setCurrentPage(Math.min(currentPage,response.data.totalPages))
      setTotalPages(response.data.totalPages)
    
    } catch (error) {
      setDataError(error.response.data)
    }

  }

  useEffect(() =>{
    getAllEmployees()
  },[currentPage,size])

  const handleDelete = (d) => {
    setEmployeeid(d.employeeid)
    setUsername(d.username)
    setShow1(true)
    
  }

  const remove = async () =>{
    await deleteEmployee(employeeid,token)
    Swal.fire({  
      title: "Employee Deleted Successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(function() {
      window.location.reload(false)
    }); 
  }

  const handleUpdate = async (d) => {
    setSalary(d.salary)
    setEmployeeid(d.employeeid)
    setShow(true)
  }

  const update = async () =>{
    if(typeof salary === 'undefined' || salary === '' ){
        Swal.fire({  
            title: "Fields are empty",
            text: "Please fill the fields",
            icon: "error",
            confirmButtonText: "OK", 
          });  
          return;
    }
    const salaryPattern = /^-?\d+(\.\d+)?$/;
    const isvalidsalary= salaryPattern.test(salary);
    if(!isvalidsalary){
      Swal.fire({  
        title: "Invalid Salary ",
        text: "Please enter correct Salary",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
   }
    try {
     await updateSalary(employeeid,salary,token)
  
      Swal.fire({  
        title: "Salary updated successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(async function() {
        handleClose()
        await getAllEmployees()
      });
    } catch (error) {
    }

  }

  const handleAddEmployee = async () =>{
    if(typeof firstname === 'undefined' || firstname === ''
    || typeof lastname === 'undefined' || lastname === '' 
    || typeof salary === 'undefined' || salary === '' 
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
    const salaryPattern = /^-?\d+(\.\d+)?$/;
    const isvalidsalary= salaryPattern.test(salary);
    if(!isvalidsalary){
      Swal.fire({  
        title: "Invalid Salary ",
        text: "Please enter correct Salary",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
    try {
      await saveEmployee(firstname,lastname,salary,uname,password,token)
      Swal.fire({  
        title: "Employee Added Successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(async function() {
        handleModalClose()
        await getAllEmployees()
      });  
      
    } catch (error) {
      Swal.fire({  
        title: "Employee Already Exists",
        icon: "error",
        confirmButtonText: "OK", 
      });
      
    }

  }

  const headers = ["Username", "First Name", "Last Name", "Salary"]
  const functions = [handleUpdate,handleDelete]
  const functionHeaders = ["Edit Salary","Remove"]

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
      let response = await axios.get(`http://localhost:8086/employeeapp/get/${searchname}`)
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
    <h1 className='heading'>Employees</h1>
    
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
          /></div>
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
    </> }
    </div>  
     
  
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill the details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
              <Form.Label>New Salary*</Form.Label>
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
    <Button className='button' variant="primary" onClick={() => {
      setModalShow(true)
      setFirstName('')
      setLastName('')
      setSalary('')
      setUsername('')
      setPassword('')
    }} style={{marginLeft:'40%'}}> Add New Employee</Button>

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
        <Form.Label>Salary*</Form.Label>
        <Form.Control type="text"  onChange={(e) => setSalary(e.target.value)}
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
        <Button variant="primary" onClick={handleAddEmployee}>
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
      Remove employee : {uname}
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

export default Employee
