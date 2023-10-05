import React, { useState } from 'react';
import './RegisterCustomer.css';
import { useNavigate, useParams } from 'react-router';
import axios from "axios"
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap';
import NavBar from '../sharedComponents/NavBar';
import { useEffect } from 'react';
import { authenticateAgent } from '../../services/Authentication';


const IndianStates = [

    "Andhra Pradesh", "Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
    "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya", "Mizoram","Nagaland", "Odisha",
    "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana", "Tripura","Uttar Pradesh", "Uttarakhand","West Bengal", 
    "Andaman and Nicobar Islands","Dadra and Nagar Haveli and Daman and Diu","Lakshadweep","Delhi","Puducherry",
  
];

function RegisterCustomer() {
    const username = useParams().username;
    const token = localStorage.getItem("auth")
    const role = localStorage.getItem("role")
    const [aadharCard, setAadharCard] = useState(null);
    const navigation = useNavigate()
  const [panCard, setPanCard] = useState(null);
  const [voterCard, setVoterCard] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobilenumber: '',
    email: '',
    dateofbirth: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    nominee: '',
    nomineerelation: '',
    username: '',
    password: ''
  });

  const authenticate =  () =>{
    if(!authenticateAgent(username))  
    navigation('/')
  }
  useEffect(() =>  { 
    authenticate()
  },[])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(typeof formData.firstname == 'undefined' || formData.firstname == null ||
   typeof formData.lastname == 'undefined' || formData.lastname == null ||
   typeof formData.mobilenumber == 'undefined' || formData.mobilenumber == null ||
   typeof formData.email == 'undefined' || formData.email == null ||
   typeof formData.address == 'undefined' || formData.address == null ||
   typeof formData.dateofbirth == 'undefined' || formData.dateofbirth == '' ||
   typeof formData.state == 'undefined' || formData.state == '' ||
   typeof formData.city == 'undefined' || formData.city == null ||
   typeof formData.pincode == 'undefined' || formData.pincode == null ||
   typeof formData.nominee == 'undefined' || formData.nominee == null ||
   typeof formData.nomineerelation == 'undefined' || formData.nomineerelation == null ||
   typeof formData.username == 'undefined' || formData.username == null ||
   typeof formData.password == 'undefined' || formData.password == null
  )
  {
    Swal.fire({  
      title: "Fields are empty",
      text: "Please fill the fields",
      icon: "error",
      confirmButtonText: "OK", 
    });
    return;  
    }
    if(aadharCard == null || panCard == null || voterCard == null){
      Swal.fire({  
        title: "Document missing",
        text: "Please upload all documents",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
    const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidfirstName = namePattern.test(formData.firstname);
    if(!isValidfirstName){
        Swal.fire({  
          title: "Invalid First Name",
          text: "Please enter correct First name",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
    }
    const isValidlastName = namePattern.test(formData.lastname);
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
    const isValidcity = cityPattern.test(formData.city);
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
    const isValidnominee = nomineePattern .test(formData.nominee);
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
    const isValidnomineeRelation = nomineeRelationPattern .test(formData.nomineerelation);
    if(!isValidnomineeRelation){
        Swal.fire({  
          title: "Invalid Nominee  Relation",
          text: "Please enter correct Nominee Relation",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
    }

    const isValidMobileNumber = /^[0-9]{10}$/.test(formData.mobilenumber);
    if(! isValidMobileNumber){
      Swal.fire({  
        title: "Invalid Mobile Number",
        text: "Please enter correct 10-digit Mobile Number",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const mailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    if(!mailCheck){
      Swal.fire({  
        title: "Invalid Email ",
        text: "Please enter correct email",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const isValidPincode = /^[0-9]{6}$/.test(formData.pincode);
    if(! isValidPincode){
      Swal.fire({  
        title: "Invalid Pincode",
        text: "Please enter correct 10-digit Pincode",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
    try {
      let response = await axios.post(`http://localhost:8086/agentapp/saveCustomer/${username}`,{
        firstname: formData.firstname,
        lastname: formData.lastname,
        mobilenumber: formData.mobilenumber,
        email: formData.email,
        dateofbirth: formData.dateofbirth,
        address: formData.address,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        nominee: formData.nominee,
        nomineerelation: formData.nomineerelation,
        user:{
            username: formData.username,
            password: formData.password
        }
        
    
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    } catch (error) {
      Swal.fire({  
        title: "User already exists",
        text: "Please enter different username",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
  

    
    await uploadDocuments(aadharCard)
    await uploadDocuments(panCard)
    await uploadDocuments(voterCard)
    Swal.fire({  
      title: "Customer registered successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }); 
    
  };

  const handleAadhar = (event) =>{
    setAadharCard(event.target.files[0]);
  }
  const handlePan = (event) =>{
    setPanCard(event.target.files[0]);
  }
  const handleVoter = (event) =>{
    setVoterCard(event.target.files[0]);
  }

  const uploadDocuments = async (file) =>{
    if(file == null){
      Swal.fire({  
        title: "Document missing",
        text: "Please upload all documents",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
    const form = new FormData();
    form.append('file', file);

    try {
      const response = await fetch(`http://localhost:8086/fileapp/upload/${formData.username}`, {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Handle the response from the server as needed
      console.log('Upload successful:', response);
       
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    
  }

  return (
    <div className='background'>
      <NavBar role={role} username={username}/>
      <button class="button-arounder" onClick={() => navigation(-1)}>Go Back</button>
      <h1>Customer Registration Form</h1>
      <div className="container">
      <hr></hr>
      <form  >
        <div  className="name-inputs"> 
         <input type="text" name="firstname" value={formData.firstname}  placeholder="First Name*" onChange={handleInputChange} required /><br />
        <input type="text" name="lastname" value={formData.lastname}  placeholder="Last Name*" onChange={handleInputChange} required /><br /> 
        </div>

        <div  className="name-inputs"> 
        <input type="tel" name="mobilenumber" value={formData.mobilenumber}  placeholder="Contact Number*" onChange={handleInputChange} required /><br />
        <input type="email" name="email" value={formData.email}  placeholder="Email*" onChange={handleInputChange} required /><br />
        </div>


        <div  className="name-inputs"> 
        <input type="date" name="dateofbirth" value={formData.dateofbirth}  placeholder="Date of Birth" onChange={handleInputChange} required /><br />
        

        <select name="state" value={formData.state}  onChange={handleInputChange} required>
          <option value="" disabled>Select Your state</option>
          {IndianStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select><br />
        
        </div>

        <div  className="name-inputs"> 
        <input type="text" name="city" value={formData.city}   placeholder="City*" onChange={handleInputChange} required /><br />

        {/* <label>Pincode:</label> */}
        <input type="number" name="pincode" value={formData.pincode}   placeholder="Pincode*" onChange={handleInputChange} required /><br />
        </div>

        
        {/* <label>Nominee:</label> */}
        <div  className="name-inputs"> 
        <input type="text" name="nominee" value={formData.nominee}   placeholder="Nominee*" onChange={handleInputChange} required /><br />

        {/* <label>Nominee Relation:</label> */}
        <input type="text" name="nomineerelation" value={formData.nomineerelation}   placeholder="Nominee Relation*" onChange={handleInputChange} required /><br />
        </div>


        <div  className="name-inputs"> 
        <input type="text" name="username" value={formData.username}   placeholder="Username*" onChange={handleInputChange} required /><br />

        <input name="password" value={formData.password}   placeholder="Password*" onChange={handleInputChange} required /><br />
        </div>
        <div  className="name-inputs"> 

        <textarea name="address" value={formData.address}   placeholder="Address*"  onChange={handleInputChange} rows="2" required></textarea><br />
        
        </div>
        <hr></hr><br></br>
        <h2>Upload Documents</h2><br></br>
        <div className='documents'>
          <div className='docBack'>
          <Form.Label>Aadhar Card*</Form.Label><br></br>
          <input type="file" onChange={handleAadhar} />
          </div>
          <div className='docBack'>
          <Form.Label>Pan Card*</Form.Label><br></br>
          <input type="file" onChange={handlePan} /> 
          </div>
          <div className='docBack'>
          <Form.Label>Voter Card*</Form.Label><br></br>
          <input type="file" onChange={handleVoter} /> 
          </div>
          
        </div>
  
        
      </form>
      <button style={{marginLeft:'40%'}} className='button' type="submit" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}

export default RegisterCustomer;
