import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from "axios"
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap';
import { authenticateAgent } from '../../services/Authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faMailBulk, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'


const IndianStates = [

    "Andhra Pradesh", "Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
    "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya", "Mizoram","Nagaland", "Odisha",
    "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana", "Tripura","Uttar Pradesh", "Uttarakhand","West Bengal", 
    "Andaman and Nicobar Islands","Dadra and Nagar Haveli and Daman and Diu","Lakshadweep","Delhi","Puducherry",
  
];

function CustomerRegistration() {

  
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


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
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
        text: "Please enter correct 6-digit Pincode",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
   try {
    let response = await axios.post(`http://localhost:8086/customerapp/save`,{
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
    

    })

    console.log(response.data)
    await uploadDocuments(aadharCard)
    await uploadDocuments(panCard)
    await uploadDocuments(voterCard)
    Swal.fire({  
        title: "Customer registered successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(() =>{
        navigation(`/login/${"customer"}`)
      });  
   } catch (error) {
    Swal.fire({  
      title: "User already exists",
      text: "Please enter different username",
      icon: "error",
      confirmButtonText: "OK", 
    });  
    return;
   }
    
    
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
      });

      // Handle the response from the server as needed
      console.log('Upload successful:', response);
     
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    
  }
  const handleAdminLogin = () =>{

    navigation(`/login/${"admin"}`)
}

const handleCustomerLogin = () =>{
    navigation(`/login/${"customer"}`)
}

const handleAgentLogin = () =>{

    navigation(`/login/${"agent"}`)
}

const handleEmployeeLogin = () =>{
    navigation(`/login/${"employee"}`)
}
const handleRegister = () =>{
    navigation(`/register`)
}
const handleContactUs = () =>{
  navigation(`/contact`)
}
const handleAboutUs = () =>{
navigation(`/about`)
}

const handlePlan = () =>{
navigation('/plan')
}
const handleHome = () =>{
  navigation('/')
  }

  return (
    <>
    <nav className="navBar" >
        <h2 className='policyMarket'>PolicyMarket</h2>
        <ul className='list'>
          <li onClick={handleHome}>Home</li>
          <li onClick={handlePlan}>Plans</li>
          <li onClick={handleAboutUs}>About Us</li>
          <li onClick={handleContactUs}>Contact Us</li>
        </ul>
          <div class="dropdown">
            <button class="dropbtn">Login</button>
            <div class="dropdown-content">
            <a onClick={handleAdminLogin}>Admin Login</a>
              <a onClick={handleEmployeeLogin}>Employee Login</a>
              <a onClick={handleAgentLogin}>Agent Login</a>
              <a onClick={handleCustomerLogin}>Customer Login</a>
            </div>
          </div>
          <button class="pbtn" style={{marginLeft:'2rem'}}>Register</button>
      
        {/* <div className='nav-head-btn'>
        <FontAwesomeIcon icon={faFacebook} size='2x' className='icons'/>
        <FontAwesomeIcon icon={faInstagram} size='2x' className='icons'/>
        <FontAwesomeIcon icon={faTwitter} size='2x' className='icons'/>
        </div>        */}
         
      </nav>
        
      
    <div className='background'>
      <h1 className='pt-4'>Customer Registration Form</h1>
      <div className="container">
      <hr></hr>
      <form  >
        <div  className="name-inputs"> 
         <input type="text" name="firstname" value={formData.firstname}  placeholder="First Name*" onChange={handleInputChange} /><br />
        <input type="text" name="lastname" value={formData.lastname}  placeholder="Last Name*" onChange={handleInputChange} /><br /> 
        </div>

        <div  className="name-inputs"> 
        <input type="tel" name="mobilenumber" value={formData.mobilenumber}  placeholder="Contact Number*" onChange={handleInputChange}  /><br />
        <input type="email" name="email" value={formData.email}  placeholder="Email*" onChange={handleInputChange} /><br />
        </div>


        <div  className="name-inputs"> 
        <input type="date" name="dateofbirth" value={formData.dateofbirth}  placeholder="Date of Birth" onChange={handleInputChange} /><br />
        

        <select name="state" value={formData.state}  onChange={handleInputChange} >
          <option value="" disabled>Select Your state</option>
          {IndianStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select><br />
        
        </div>

        <div  className="name-inputs"> 
        <input type="text" name="city" value={formData.city}   placeholder="City*" onChange={handleInputChange} /><br />

        {/* <label>Pincode:</label> */}
        <input type="number" name="pincode" value={formData.pincode}   placeholder="Pincode*" onChange={handleInputChange}/><br />
        </div>

        
        {/* <label>Nominee:</label> */}
        <div  className="name-inputs"> 
        <input type="text" name="nominee" value={formData.nominee}   placeholder="Nominee*" onChange={handleInputChange}  /><br />

        {/* <label>Nominee Relation:</label> */}
        <input type="text" name="nomineerelation" value={formData.nomineerelation}   placeholder="Nominee Relation*" onChange={handleInputChange}  /><br />
        </div>


        <div  className="name-inputs"> 
        <input type="text" name="username" value={formData.username}   placeholder="Username*" onChange={handleInputChange}  /><br />

        <input name="password" value={formData.password}   placeholder="Password*" onChange={handleInputChange}  /><br />
        </div>
        <div  className="name-inputs"> 

        <textarea name="address" value={formData.address}   placeholder="Address*"  onChange={handleInputChange} rows="2" ></textarea><br />
        
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
    <div className='footer'>
  <footer
          className="text-center text-lg-start text-dark"
          style={{backgroundColor:'#ECEFF1'}}
          // style="background-color: #ECEFF1"
          >
    <section
             className="d-flex justify-content-between p-4 text-white"
             style={{backgroundColor:'#21D192'}}
            //  style="background-color: #21D192"
             >
      <div className="me-5">
        <span>Get connected with us on social networks:</span>
      </div>
      <div>
        <a href="" className="text-white me-4">
        <FontAwesomeIcon icon={faFacebook} size='1x' className='icons'/>
        </a>
        <a href="" className="text-white me-4">
        <FontAwesomeIcon icon={faTwitter} size='1x' className='icons'/>
        </a>
        <a href="" className="text-white me-4">
        <FontAwesomeIcon icon={faGoogle} size='1x' className='icons'/>
        </a>
        <a href="" className="text-white me-4">
        <FontAwesomeIcon icon={faInstagram} size='1x' className='icons'/>
        </a>
      </div>
    </section>
    <section className="">
      <div className="container text-center text-md-start mt-5">

        <div className="row mt-3">

          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

            <h6 className="text-uppercase fw-bold">PolicyMarket</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                // style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p>
            Simplifying Insurance Choices for You. Providing Comprehensive Coverage Solutions Since 2023. Your Peace of Mind is Our Priority.
            </p>
          </div>
   
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Logins</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                // style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p>
              <a href="" className="text-dark" onClick={handleAdminLogin}>Admin Login</a>
            </p>
            <p>
              <a href="" className="text-dark" onClick={handleCustomerLogin}>Customer Login</a>
            </p>
            <p>
              <a href="" className="text-dark" onClick={handleEmployeeLogin}>Employee Login</a>
            </p>
            <p>
              <a href="" className="text-dark" onClick={handleAgentLogin}>Agent Login</a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Useful links</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                // style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p>
            <a href="" className="text-dark" onClick={handlePlan}>Plans</a>
            </p>
            <p>
              <a href="" className="text-dark" onClick={handleRegister}>Register</a>
            </p>
            <p>
              <a href="" className="text-dark" onClick={handleAboutUs}>About Us</a>
            </p>
            <p>
              <a href="#!" className="text-dark" onClick={handleContactUs}>Contact Us</a>
            </p>
           
          </div>
  
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                // style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p><FontAwesomeIcon icon={faHome} size='1x' className='icons'/> Barora, Dhanbad, Jharkhand, 828306, India</p>
            <p><FontAwesomeIcon icon={faEnvelope} size='1x' className='icons'/> policymarket@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} size='1x' className='icons'/> +91-7867565433</p>
          </div>
        </div>
      </div>
    </section>

    <div
         className="text-center p-3"
         style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
         >
      Copyright © 2023 PolicyMarket. All Rights Reserved.
    </div>
  </footer>

</div>
    </>
  );
}

export default CustomerRegistration;
