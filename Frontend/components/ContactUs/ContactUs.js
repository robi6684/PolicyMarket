import React, { useState } from 'react';
import './ContactUs.css'; // Import the CSS file for styling
import Iframe from 'react-iframe';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faMailBulk, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'

function ContactUs() {

    const navigation = useNavigate()
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        };
        
    const handleQueryChange = (event) => {
    setQuery(event.target.value);
    };

    const handleSend = async () =>{
      if(email == '' || query == ''){
        Swal.fire({  
          title: "Fields are empty",
          text: "Please fill the fields",
          icon: "error",
          confirmButtonText: "OK", 
          });
      return
      }
    let response = await axios.post(`http://localhost:8086/queryapp/save`,{
        email,
        content : query
    })
    Swal.fire({  
        title: "Query Sent Successfully",
        icon: "success",
        confirmButtonText: "OK", 
        }).then(function () {
        window.location.reload(false)
        });  
    return
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
          <button class="pbtn" style={{marginLeft:'2rem'}} onClick={handleRegister}>Register</button>
      
        {/* <div className='nav-head-btn'>
        <FontAwesomeIcon icon={faFacebook} size='2x' className='icons'/>
        <FontAwesomeIcon icon={faInstagram} size='2x' className='icons'/>
        <FontAwesomeIcon icon={faTwitter} size='2x' className='icons'/>
        </div>        */}
         
      </nav>
    <div className='background'>
    <h1 className='pt-3'>Contact Us</h1><hr></hr>
    <div className="contact-us-container">
         
      <div className="contact-info">
      <p className='para'><b>Address:</b> Barora, Dhanbad, Jharkhand, India, 828306</p>
    <p className='para'><b>Email:</b> policymarket@gmail.com</p>
    <p className='para'><b>Phone:</b> +91-9834562381</p>
        <Iframe
      url="https://maps.google.com/maps?q=Barora Nawagarh&t=&z=12&ie=UTF8&iwloc=&output=embed"
      width="500"
      height="300"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      className='mt-4'
    /> 
    
      </div>

      <div className="contact-form">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email"  value={email}
            placeholder="Your Email"
            onChange={handleEmailChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message*</label>
            <textarea id="message" name="message" rows="4"
             placeholder="Your Query"
             onChange={handleQueryChange} required></textarea>
          </div>

          
        </form>
        <button type="submit" className='button' onClick={() => handleSend()}>Send</button>
      </div>
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

export default ContactUs;
