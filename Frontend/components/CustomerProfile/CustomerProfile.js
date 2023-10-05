import React from 'react'
import { useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { authenticateCustomer } from '../../services/Authentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const CustomerProfile = () => {
    const username = useParams().username
    const token = localStorage.getItem("auth")
    const role = localStorage.getItem("role")
    const [data,setData] = useState({})
    const navigation = useNavigate()

    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('')
    const [password,setPassword] = useState('')
    const [newpassword,setNewPassword] = useState('')
    const[customerid, setCustomerid] = useState()
    const [mobilenumber,setMobilenumber] = useState()
    const [email,setEmail] = useState()
    const[dateofbirth ,setDateofbirth] = useState()
    const[address,setAddress] = useState()
    const[city,setCity] = useState()
    const[state,setState] = useState()
    const[pincode,setPincode] = useState()
    const[nomineerelation,setNomineerelation] = useState()
    const[nominee,setNominee] = useState()
    const[documentstatus,setDocumentstatus] = useState()

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
    const authenticate =  () =>{
      if(!authenticateCustomer(username)) 
      navigation('/')
    }
    useEffect(() =>  {
      authenticate()
    },[])

    let response
    const getCustomer = async () =>{
      try {
        response = await axios.get(`http://localhost:8086/customerapp/getCustomer/${username}`,{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        setData(response.data);
        setFirstName(response.data.firstname)
        setLastName(response.data.lastname)
        setAddress(response.data.address)
        setCity(response.data.city)
        setDateofbirth(response.data.dateofbirth)
        setPincode(response.data.pincode)
        setState(response.data.state)
        setDocumentstatus(response.data.documentstatus)
        setNomineerelation(response.data.nomineerelation)
        setNominee(response.data.nominee)
        setEmail(response.data.email)
        setMobilenumber(response.data.mobilenumber)
        setCustomerid(response.data.customerid)
        
      } catch (error) {
        
      }
        
    }

    useEffect(() =>{
        getCustomer();
    },[])

    const handleUpdate = async () =>{
      if(typeof firstname == 'undefined' || firstname == '' ||
      typeof lastname == 'undefined' || lastname == '' ||
      typeof email == 'undefined' || email == '' ||
      typeof dateofbirth == 'undefined' || dateofbirth == '' ||
      typeof mobilenumber == 'undefined' || mobilenumber == '' ||
      typeof state == 'undefined' || state == '' ||
      typeof city == 'undefined' || city == '' ||
      typeof pincode == 'undefined' || pincode == '' ||
      typeof address == 'undefined' || address == '' ||
      typeof nominee == 'undefined' || nominee == ''||
      typeof nomineerelation == 'undefined' || nomineerelation == ''){
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

    const cityPattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidcity = cityPattern.test(city);
    if(!isValidcity){
        Swal.fire({  
          title: "Invalid City Name",
          text: "Please enter correct City name",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
    }

    const nomineePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidnominee = nomineePattern .test(nominee);
    if(!isValidnominee){
        Swal.fire({  
          title: "Invalid Nominee Name",
          text: "Please enter correct Nominee name",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
    }

    const nomineeRelationPattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidnomineeRelation = nomineeRelationPattern .test(nomineerelation);
    if(!isValidnomineeRelation){
        Swal.fire({  
          title: "Invalid Nominee  Relation",
          text: "Please enter correct Nominee Relation",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
    }

    const isValidMobileNumber = /^[0-9]{10}$/.test(mobilenumber);
    if(! isValidMobileNumber){
      Swal.fire({  
        title: "Invalid Mobile Number",
        text: "Please enter correct 10-digit Mobile Number",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
    const mailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    if(!mailCheck){
      Swal.fire({  
        title: "Invalid Email ",
        text: "Please enter correct email",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const isValidPincode = /^[0-9]{6}$/.test(pincode);
    if(! isValidPincode){
      Swal.fire({  
        title: "Invalid Pincode",
        text: "Please enter correct 6-digit Pincode",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
    try {
      await axios.put(`http://localhost:8086/customerapp/updateCustomer/${customerid}`,{
            firstname,
            lastname,
            mobilenumber,
            email,
            dateofbirth,
            address,
            state,
            city,
            pincode,
            nominee,
            nomineerelation
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
            await getCustomer()
          });  
    } catch (error) {
     console.log(error)
    }
        
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
        await axios.put(`http://localhost:8086/customerapp/updatePassword/${customerid}/${password}`,{
            
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
            <label class="form-label">Date Of Birth</label>
            <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             onChange={(e) => setDateofbirth(e.target.value)}
             value={dateofbirth} 
            />
            </div>
            </div>
        </div>
        <div className="mb-3">
          <div className='row'>
            <div className='col-4'>
            <Form.Label>Mobile Number</Form.Label> 
              <Form.Control type="text"  onChange={(e) => setMobilenumber(e.target.value)}
              value={mobilenumber}/> 
            </div>
            <div className='col-4'>
            <Form.Label>Email</Form.Label> 
              <Form.Control type="text"  onChange={(e) => setEmail(e.target.value)}
              value={email}/> 
            </div>
            <div className='col-4'>
            <label class="form-label">State</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             onChange={(e) => setState(e.target.value)}
             value={state}
            />
            </div>
            </div>
        </div>
        <div className="mb-3">
          <div className='row'>
            <div className='col-4'>
            <Form.Label>City</Form.Label> 
              <Form.Control type="text"  onChange={(e) => setCity(e.target.value)}
              value={city}/> 
            </div>
            <div className='col-4'>
            <Form.Label>Pin Code</Form.Label> 
              <Form.Control type="text"  onChange={(e) => setPincode(e.target.value)}
              value={pincode}/> 
            </div>
            <div className='col-4'>
            <label class="form-label">Nominee</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             onChange={(e) => setNominee(e.target.value)}
             value={nominee}
            />
            </div>
            </div>
        </div>
        <div className="mb-3">
          <div className='row'>
            <div className='col-4'>
            <Form.Label>Nominee Relation</Form.Label> 
              <Form.Control type="text"  onChange={(e) => setNomineerelation(e.target.value)}
              value={nomineerelation}/> 
            </div>
            <div className='col-4'>
            <Form.Label>Document Status</Form.Label> 
              <Form.Control type="text" 
              value={documentstatus} disabled/> 
            </div>
            </div>
        </div>
        <div className="mb-3">
          <div className='row'>
            <textarea onChange={(e) => setAddress(e.target.value)} value={address}></textarea>
           
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
              <Form.Control type={showPassword2} onChange={(e) => setNewPassword(e.target.value)}
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

export default CustomerProfile
