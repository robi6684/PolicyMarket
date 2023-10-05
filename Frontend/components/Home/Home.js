import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faMailBulk, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, Carousel } from 'react-bootstrap'
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets//img4.png'
import img5 from '../../assets//img5.png'
import img6 from '../../assets//img6.jpg'
import img7 from '../../assets//img7.png'
import img8 from '../../assets//img8.jpg'
import img9 from '../../assets//img9.png'
import img10 from '../../assets//img10.jpg'


const Home = () => {
    const navigation = useNavigate()
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, null, window.location.href);
        };
      }, []);
  
    const clearLocalStorage = () =>{
        localStorage.clear()
    }

    useEffect(() => {
        clearLocalStorage()
    },[])

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
    <div>
      {/* <button onClick={handleAdminLogin}>Admin Login</button>
      <button onClick={handleCustomerLogin}>Customer Login</button>
      <button onClick={handleEmployeeLogin}>Employee Login</button>
      <button onClick={handleAgentLogin}>Agent Login</button>
      <button onClick={handleRegister}>Register</button> */}
      <>
      <nav className="navBar" >
        <h2 className='policyMarket'>PolicyMarket</h2>
        <ul className='list'>
          <li  onClick={handleHome}>Home</li>
          <li  onClick={handlePlan}>Plans</li>
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
      </>
      <>
      <div>
        <Carousel> 
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img
          className="img-thumbnail "
          src={img2}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img
          className="img-thumbnail "
          src={img1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img
          className="img-thumbnail"
          src={img3}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
    <h1 className='my-5'>New Launches</h1>
    <div className='cont'>
      
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img9} />
      <div class="box">
        <div class="ribbon-2"><b>Discounted Price</b></div>
      </div>
      
      <Card.Body>
        <Card.Title>Family Health Insurance</Card.Title>
        <Card.Text>
        Protect your family's well-being with comprehensive health insurance coverage. Secure their future and peace of mind today!
        </Card.Text>
        <Button variant="primary" onClick={handlePlan} >Know More</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img8} style={{height:'37vh'}} />
      <div class="box">
        <div class="ribbon-2"><b>Latest Deals</b></div>
      </div>
      <Card.Body>
        <Card.Title>Sampoorna Jeevan</Card.Title>
        <Card.Text>
        Choose Sampoorna Jeevan for a lifetime of security. Ensures peace of mind, from the first breath to the last!
        </Card.Text>
        <Button variant="primary" onClick={handlePlan}>Know More</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src={img10} style={{height:'37vh'}}/>
      <div class="box">
        <div class="ribbon-2"><b>Launch Offers</b></div>
      </div>
      <Card.Body>
        <Card.Title>SafeHaven Coverage</Card.Title>
        <Card.Text>
        Protect your home sweet home with our comprehensive insurance. Secure your haven and embrace worry-free living today.
        </Card.Text>
        <Button variant="primary" onClick={handlePlan}>Know More</Button>
      </Card.Body>
    </Card>

    </div>
    </>
    <h1 className='my-5'>Popular Plans</h1>
    <div className='cont1'>
      
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img5} style={{height:'35vh'}} />
      <div class="ribbon-1 left">High Returns</div>
      <Card.Body>
        <Card.Title>Home Insurance</Card.Title>
        <Card.Text>
        Your home, your sanctuary. Our home insurance shields your haven, preserving your peace and safeguarding your cherished memories. Protect it today.
        </Card.Text>
        <Button variant="primary" onClick={handlePlan}>Know More</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img6} style={{height:'35vh'}}/>
      <div class="ribbon-1 left">Max Savings</div>
      <Card.Body>
        <Card.Title>Family Insurance</Card.Title>
        <Card.Text>
        Family first, always. Our comprehensive family insurance offers protection and security, ensuring your loved ones' well-being for a brighter future.
        </Card.Text>
        <Button variant="primary" onClick={handlePlan}>Know More</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img4} style={{height:'35vh'}} />
      <div class="ribbon-1 left">Extra Coverage</div>
      <Card.Body>
        <Card.Title>Health Insurance</Card.Title>
        <Card.Text>
        Prioritize your well-being with our health insurance. Your path to a healthy, worry-free life starts here, ensuring a secure and happy tomorrow.
        </Card.Text>
        <Button variant="primary" onClick={handlePlan}>Know More</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img7} style={{height:'35vh'}} />
      <div class="ribbon-1 left">World Tour</div>
      <Card.Body>
        <Card.Title>Travel Insurance</Card.Title>
        <Card.Text>
        Adventure with peace of mind. Our travel insurance safeguards your journeys, so you can explore the world worry-free, one destination at a time.
        </Card.Text>
        <Button variant="primary" onClick={handlePlan}>Know More</Button>
      </Card.Body>
    </Card>
    </div>

<h1 className='my-5'>Why PolicyMarket</h1>
<div className='acc'>
    <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <b>Reason #1</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body" style={{backgroundColor:'#51e4a7'}}>
        <strong>Wide Selection of Options: </strong> 
         PolicyMarket typically offer a diverse range of insurance policies from various providers. This wide selection allows customers to compare multiple options, 
        ensuring they find a policy that best suits their specific needs and budget. With a single platform, they can access policies they might not have discovered through traditional means.<br></br>
        <strong>Competitive Pricing: </strong> 
         PolicyMarket foster competition among insurance providers. This competition can lead to more competitive pricing as insurers vie for customers. As a result, individuals can often find policies 
        at more affordable rates when using PolicyMarket, potentially saving them money on premiums.<br></br>
        <strong>Transparency and Information:</strong> PolicyMarket aims to provide transparency by presenting detailed information about each policy, including coverage, terms, conditions, and pricing. This transparency empowers customers to make well-informed decisions about their insurance needs. 
        User reviews and ratings can also provide valuable insights into the quality of a particular insurance provider.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
      <b>Reason #2</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body" style={{backgroundColor:'#51e4a7'}}>
      <strong>Convenience and Efficiency: </strong> Buying insurance through PolicyMarket is typically a more convenient and efficient process. Users can complete the entire insurance purchase process online, from comparing policies to filling out applications and making payments. This eliminates 
      the need for in-person visits to insurance agencies or lengthy phone calls, saving time and effort.<br></br>
      <strong>Personalization: </strong> PolicyMarket use algorithms and data analysis to recommend insurance policies tailored to an individual's specific circumstances and preferences. This personalized approach helps customers find coverage that aligns with their unique needs and risks, ensuring they get the most value out of their insurance.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
      <b>Reason #3</b>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body" style={{backgroundColor:'#51e4a7'}}>
       <strong>Easy Management and Access: </strong> PolicyMarket often offer features for managing policies digitally. Users can access their policy information, make changes, and even file claims through the app or website. This digital accessibility makes it convenient for policyholders to stay on top of their insurance needs.<br></br>
       <strong>Regular Updates and Notifications: </strong>PolicyMarket may send users reminders about policy renewals, important updates, and changes in regulations or terms. These notifications help policyholders stay informed and prevent lapses in coverage.<br></br>
      <strong>Security and Trust: </strong>Reputable PolicyMarket prioritize the security of customer data and transactions. They often implement robust security measures to protect user information and provide a sense of trust and reliability to customers.
      </div>
    </div>
  </div>
</div>
</div>
<>
<h1 className='my-5'>Customer Reviews</h1>
<div className='review'>
<Carousel> 
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
       <div style={{backgroundColor:'wheat',  height: '60vh', padding:'10px 30px'}}>
        <h5 className='mt-4'>Vimal Kumar</h5>
        <h6>Individual Health Insurance</h6>
        <div>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons'/>
        </div>
        <p className='mt-1'>I'm delighted with my individual health insurance purchase from PolicyMarket. Their extensive policy selection, transparent information, and competitive pricing made finding the right coverage a breeze. The efficient online purchase process, personalized recommendations, and user-friendly policy management have been incredibly convenient. Regular notifications and responsive customer support have added to my confidence in their service. With PolicyMarket, I have peace of mind, knowing I've made a wise choice for my health insurance needs. Highly recommended!</p>
        
       </div>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <div style={{backgroundColor:'wheat', height: '60vh', padding:'10px 30px'}}>
        <h5 className='mt-4'>Suman Kumar</h5>
        <h6>Bike Insurance</h6>
        <div>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        </div>
        <p className='mt-1'>I'm thrilled with my car insurance from PolicyMarket. Their platform offered a wide range of policies, making it easy to find one that suited my needs and budget. The transparency and competitive pricing were impressive, ensuring I got great value. The online purchase process was quick and hassle-free. PolicyMarket's user-friendly interface, personalized recommendations, and efficient policy management make it a top choice. Regular updates and responsive customer support add to the overall positive experience. PolicyMarket has provided me with peace of mind and a reliable car insurance solution. Highly recommended!</p>
       </div>
      
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <div style={{backgroundColor:'wheat',height: '60vh', padding:'10px 30px'}}>
        <h5 className='mt-4'>Karishma Singh</h5>
        <h6>Life Insurance</h6>
        <div>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons'/>
        </div>
        <p className='mt-1'>PolicyMarket made buying life insurance a breeze. Their platform offers an array of policies, ensuring I found one tailored to my family's future needs. The straightforward information, competitive rates, and seamless online process made it a hassle-free experience. Their user-friendly interface simplifies policy management, and regular updates keep me informed. I'm grateful for the peace of mind and financial security PolicyMarket's life insurance provides. It's a trusted choice for anyone seeking dependable life insurance solutions. Highly recommended!</p>
       </div>
      
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <div style={{backgroundColor:'wheat',height: '60vh', padding:'10px 30px'}}>
        <h5 className='mt-4'>Vidya Pandey</h5>
        <h6>Travel Insurance</h6>
        <div>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        <FontAwesomeIcon icon={faStar} size='1x' className='icons' style={{color:'orange'}}/>
        </div>
        <p className='mt-1'>PolicyMarket exceeded my expectations with their travel insurance offerings. Their platform offers a diverse range of policies that cater to various travel needs. I was impressed by the straightforward information, competitive rates, and the effortless online purchase process. Managing my policy is a breeze with their user-friendly interface. Regular updates and responsive customer support give me confidence in their service. Thanks to PolicyMarket, I travel with peace of mind, knowing I have reliable coverage. It's the go-to platform for hassle-free travel insurance solutions. Highly recommended!</p>
       </div>
      
      </Carousel.Item>
    </Carousel>
    </div>
</>
<div className='footer mt-5'>
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
    </div>
    

  )
}

export default Home
