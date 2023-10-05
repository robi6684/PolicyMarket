import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getPlan } from '../../services/PlanApi'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import { Form } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faMailBulk, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'
import Error from '../sharedComponents/Error'
import Swal from 'sweetalert2'

const HomePlan = () => {
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
    const[data,setData] = useState([])
    const navigation = useNavigate()
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
    const getAllPlans = async () => {
    try {   
        let response = await axios.get('http://localhost:8086/planapp/getAllPlans',
            {
                params: {
                pageno: currentPage-1,
                pagesize: size,
                }
            }
    
         )
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

    const handleScheme = (d) =>{
        navigation(`/scheme/${d.planid}`)
    }

    const headers = ["Plan Name"]
    const functions = [handleScheme]
    const functionHeaders = ["View Scheme"] 
    
    const handleHome = () =>{
      navigation('/')
    }
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
        <h1 className='pt-3'>Plans</h1>
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
    <hr></hr><br></br>
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

export default HomePlan
