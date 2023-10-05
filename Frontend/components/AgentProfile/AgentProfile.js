import React from 'react'
import { useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { authenticateAgent } from '../../services/Authentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const AgentProfile = () => {
    const username = useParams().username
    const token = localStorage.getItem("auth")
    const role = localStorage.getItem("role")
    const [data,setData] = useState({})
    const navigation = useNavigate()

    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('')
    const [password,setPassword] = useState('')
    const [newpassword,setNewPassword] = useState('')
    const[agentid, setAgentid] = useState()
    const [commission,setCommission] = useState()
    const [show, setShow] = useState(false);

    const [showPassword2,setShowPassword2] = useState("password")
    const [showPassword,setShowPassword] = useState("password")
    const [passwordIcon, setPasswordIcon] = useState(<FontAwesomeIcon icon={faEye} size='1x' className='password-btn'  />)
    const [passwordIcon2, setPasswordIcon2] = useState(<FontAwesomeIcon icon={faEye} size='1x' className='password-btn2'  />)

    const handleClose = () => {
      setShow(false);
      setShowPassword("password")
      setShowPassword2("password")
      setPasswordIcon(<FontAwesomeIcon icon={faEye} size='1x' className='password-btn'  />)
      setPasswordIcon2(<FontAwesomeIcon icon={faEye} size='1x' className='password-btn2'  />)
    }

    console.log(username)
    const authenticate =  () =>{
      if(!authenticateAgent(username))
      navigation('/')
    }
    useEffect(() =>  {
      authenticate()
    },[])
  

    let response
    const getAgent = async () =>{
      try {
        response = await axios.get(`http://localhost:8086/agentapp/getAgent/${username}`,{
          headers :{
              Authorization : `Bearer ${token}`
          }
      })
      console.log(response)
      setData(response.data);
      setFirstName(response.data.firstname)
      setLastName(response.data.lastname)
      setAgentid(response.data.agentid)
      setCommission(response.data.commission)
      } catch (error) {
        
      }
       
    }

    useEffect(() =>{
        getAgent();
    },[])

    const handleUpdate = async () =>{
      if(typeof firstname == 'undefined' || firstname == '' ||
      typeof lastname == 'undefined' || lastname == ''){
        Swal.fire({  
          title: "Fields are empty",
          text: "Please fill the fields",
          icon: "error",
          confirmButtonText: "OK", 
        });
        return
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
        await axios.put(`http://localhost:8086/agentapp/updateAgent/${agentid}`,{
            firstname,
            lastname,
        },{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })

        Swal.fire({  
            title: "Profile Details Updated Successfully",
            icon: "success",
            confirmButtonText: "OK", 
          }).then(async function() {
            await getAgent()
          });  
    }

    const update = async () =>{
      if(typeof password == 'undefined' || password == '' ||
      typeof newpassword == 'undefined' || newpassword == ''){
        Swal.fire({  
          title: "Fields are empty",
          text: "Please fill the fields",
          icon: "error",
          confirmButtonText: "OK", 
        });
        return
      }

      if(password !== newpassword){
        Swal.fire({  
          title: "Password mismatch",
          text: "Please enter same password",
          icon: "error",
          confirmButtonText: "OK", 
        });
        return
      }
        await axios.put(`http://localhost:8086/agentapp/updatePassword/${agentid}/${password}`,{
            
        },{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })

        Swal.fire({  
            title: "Password Updated Successfully",
            icon: "success",
            confirmButtonText: "OK", 
          }).then(async function() {
            navigation('/')
          });  
    }

  return (
    <div className='background'>
        <NavBar role = {role} username = {username}/>
        <h1 className='heading'>Profile Details</h1>
      <div className='buyplan'>
        <form>
          <hr></hr><br></br>
        <div className="mb-3">
          <div className='row'>
            <div className='col-4'>
            <Form.Label>First Name</Form.Label> 
              <Form.Control type="text"  onChange={(e) => setFirstName(e.target.value)}
              value={firstname}/> 
            </div>
            <div className='col-4'>
            <Form.Label>Last Name</Form.Label> 
              <Form.Control type="text"  onChange={(e) => setLastName(e.target.value)}
              value={lastname}/> 
            </div>
            <div className='col-4'>
            <label class="form-label">Total Commission</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={Math.ceil(data.commission)} disabled
            />
            </div>
            </div><br></br>
            <div className='row'>
                <div className='col-2'></div>
            <div className='col-2'></div>
            </div>
        </div>
        </form>
        
       </div>
       <div>
       <button className='button' style={{marginLeft:'30%'}} onClick={handleUpdate}>Update Details</button>
       <button className='button' style={{marginLeft:'5%'}}  onClick={() => {setShow(true)}}>Update Password</button>
       </div>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill the details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
              <Form.Label>New Password*</Form.Label>
              <Form.Control type={showPassword}  onChange={(e) => setPassword(e.target.value)}
              /> 
               <span onClick={() =>{
                if(showPassword == "password"){
                    setShowPassword("text")
                    setPasswordIcon(<FontAwesomeIcon icon={faEyeSlash} size='1x' className='password-btn'  />)
                }
                else{
                    setShowPassword("password")
                    setPasswordIcon(<FontAwesomeIcon icon={faEye} size='1x' className='password-btn'  />)
                }
                }}>{passwordIcon}</span>
              <Form.Label>Confirm New Password*</Form.Label>
              <Form.Control type={showPassword2}  onChange={(e) => setNewPassword(e.target.value)}
              /> 
              <span onClick={() =>{
                if(showPassword2 == "password"){
                    setShowPassword2("text")
                    setPasswordIcon2(<FontAwesomeIcon icon={faEyeSlash} size='1x' className='password-btn2'  />)
                }
                else{
                    setShowPassword2("password")
                    setPasswordIcon2(<FontAwesomeIcon icon={faEye} size='1x' className='password-btn2'  />)
                }
                }}>{passwordIcon2}</span>              
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={update}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AgentProfile
