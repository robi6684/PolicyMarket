import React from 'react'
import './AboutUs.css'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faMailBulk, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'

const AboutUs = () => { 
const navigation = useNavigate()
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
    <h1 className='pt-3'>About Us</h1>
    <hr></hr>
    <div class="aboutcontainer">

        <h2 className='mb-4'>Welcome to PolicyMarket</h2>
        <p className='p'>Your trusted partner in the world of insurance. At PolicyMarket, we are dedicated to simplifying the insurance process, making it accessible, and ensuring that you have the coverage you need to protect what matters most.</p>

        <h3>Our Mission</h3>
        <ul className='aboutul'>
            <li><span class="highlight">Empowering You with Choice:</span> We believe that every individual and business deserves the power of choice when it comes to insurance.</li>
            <li><span class="highlight">Simplicity and Transparency:</span> We're committed to demystifying insurance.</li>
            <li><span class="highlight">Customer-Centric:</span> Your satisfaction is at the heart of everything we do.</li>
        </ul>

        <h3>Why Choose PolicyMarket?</h3>
        <ul>
            <li><span class="highlight">**Extensive Selection:**</span> PolicyMarket partners with a network of trusted insurance providers to offer you a comprehensive selection of policies.</li>
            <li><span class="highlight">Easy Comparison:</span> Our user-friendly platform allows you to compare multiple insurance options side by side.</li>
            <li><span class="highlight">Expert Advice:</span> Have questions or need guidance? Our experienced insurance professionals are here to assist you.</li>
            <li><span class="highlight">Security and Privacy:</span> We take your security and privacy seriously.</li>
            <li><span class="highlight">Community and Education:</span> We believe in building a knowledgeable community.</li>
        </ul>

        <div class="commitment">
            <h3>Our Commitment</h3>
            <p>At PolicyMarket, our commitment extends beyond just providing insurance solutions. We are dedicated to:</p>
            <ul>
            <li><span class="highlight">**Building Trust:** </span>We understand that trust is the foundation of any lasting relationship, and we work tirelessly to earn and maintain your trust.</li>
            <li><span class="highlight">Accessibility:</span> We strive to make insurance accessible to everyone, ensuring that you have access to the coverage you need, when you need it.</li>
            <li><span class="highlight">Innovation:</span> We continually explore innovative solutions to enhance the insurance experience for our customers.</li>
            <li><span class="highlight">Sustainability:</span> We are committed to sustainable practices and contribute to a greener, more environmentally responsible future.</li>
            </ul>
            <p>Our team is passionate about serving you, and we look forward to being your trusted insurance partner.</p>
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

  )
}

export default AboutUs
