import React from 'react'
import { useState } from 'react'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import { Button, Form, Modal } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios' 
import { useNavigate, useParams } from 'react-router'
import Error from '../sharedComponents/Error'
import Swal from 'sweetalert2'

const HomeScheme = () => {
  const handleHome = () =>{
    navigation(`/`)
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
   
    const planid = useParams().planid
    const[data,setData] = useState([])
    const[schemeid,setSchemeId] = useState()
    const[schemename,setSchemeName] = useState()
    const[minage,setMinage] = useState()
    const[maxage,setMaxage] = useState()
    const[minamount,setMinAmount] = useState()
    const[maxamount,setMaxAmount] = useState()
    const[maxiamount,setMaxiamount] = useState()
    const[mininvesttime,setMininvestime] = useState()
    const[maxinvesttime,setMaxinvesttime] = useState()
    const[profitratio,setProfitratio] = useState()
    const[registrationcommission,setRegistrationcommission] = useState()
    const [selectedFile, setSelectedFile] = useState(null);
    const [aadharCard, setAadharCard] = useState(null);
    const [panCard, setPanCard] = useState(null);
    const [voterCard, setVoterCard] = useState(null);
    const[investmentYear,setInvestMentYear] = useState()
    const[investmentAmount,setInvestmentAmount] = useState()
    const[premiumtype,setPremiumtype] = useState()
    const[showview,setShoeview] = useState(false)
    const[premiumamount,setPremiumamount] = useState()
    const[sumassured,setSumassured] = useState()
    const navigation = useNavigate()
    const [customerusername,setCustomerusername] = useState()
    const [custsize,setCustSize] = useState(5)
    const[val,setVal] = useState({})
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false); setShoeview(false)};
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const updateModalClose = () => setUpdateModalShow(false);
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

    const getAllSchemes = async () => {
    
        try {   
            let response = await axios.get(`http://localhost:8086/schemeapp/getAllSchemes/${planid}`,
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
          setDataError({})
        
        } catch (error) {
          setDataError(error.response.data)
        }
    
      }
    
      useEffect(() =>{
        getAllSchemes()
      },[currentPage,size])

      const handleBuy = (d) =>{
        setShow(true)
        setMinAmount(d.minamount)
        setInvestmentAmount(d.minamount)
        setMaxAmount(d.maxamount)
        setMininvestime(d.mininvesttime)
        setInvestMentYear(d.mininvesttime)
        setMaxinvesttime(d.maxinvesttime)
        setMinage(d.minage)
        setMaxage(d.maxage)
        setPremiumtype("Yearly")
        setSchemeId(d.schemeid)
        setSchemeName(d.schemename)
        setProfitratio(d.profitratio)
        setPremiumamount('')
        setSumassured('')
      }

      const buyPlan = () =>{
        navigation(`/login/${"customer"}`)

      }

      const handleDownload = async (d) => {
        try {
          const response = await axios.get(`http://localhost:8086/schemefileapp/download/${d.schemeid}`, {
            responseType: 'blob',// Set the response type to 'blob' for binary data
             
          });
    
          // Create a blob URL from the response data
          const blobUrl = URL.createObjectURL(new Blob([response.data]));
    
          // Create a link element and simulate a click to trigger the download
          const link = document.createElement('a');
          link.href = blobUrl;
          const filename = `${d.schemename}.pdf`
         link.download = filename; // Use the original file name
          link.click();
    
          // Clean up the blob URL after the download
          URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error('Error downloading file:', error);
        }
    }
    const headers = ["Name","Min age", "Max Age", "Min Amount", "Max Amount", "Min Invest Time"
    ,"Max Invest Time", "Profit Ratio"]
    const functions = [handleDownload,handleBuy]
    const functionHeaders = ["Brochure","Calculate"]

    let investmentyears = []
    for(let i=mininvesttime; i<=maxinvesttime; i++){
        investmentyears.push(i);
    }
    
    let options1 = investmentyears.map((d) =>{
    return(
        <>
        <option value={d}>{d}</option>
        </>
    )
    }
    )

    let investmentamounts = []
    for(let i=minamount; i<=maxamount; i+=100000){
        investmentamounts.push(i)
    }
    

    let options2 = investmentamounts.map((d) =>{
    return(
        <>
        <option value={d}>{d}</option>
        </>
    )
    }
    )

    const calculate = () =>{
        if(premiumtype == "Yearly"){
        setPremiumamount(Math.ceil(investmentAmount/investmentYear))
        }
        if(premiumtype == "Monthly"){
        setPremiumamount(Math.ceil(investmentAmount/(investmentYear*12)) )
        }
        if(premiumtype == "Quarterly"){
        setPremiumamount(Math.ceil(investmentAmount/(investmentYear*3)))
        }

        setSumassured(Math.ceil(Number(investmentAmount) + Number(((profitratio/100)*investmentAmount))))
        setShoeview(true)
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
      let response = await axios.get(`http://localhost:8086/schemeapp/get/${searchname}/${planid}`)
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
      <button class="button-arounder" onClick={() => navigation(-1)}>Go Back</button>
        <h1 className='pt-3'>Schemes</h1>
       
      
     <div className='scheme-container'>
      <hr></hr>
      <input type='text' placeholder='Scheme Name' onChange={(e) => setSearchname(e.target.value)}></input>
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
    </>}
    <hr></hr><br></br>
    </div>
    
    </div>
    <Modal show={show} onHide={handleClose}  
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Interest Calculator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <Form.Label>Investment Time</Form.Label> 
        <Form.Control
              as="select"
              value={investmentYear}
              onChange={e => {
                setInvestMentYear(e.target.value) }}
              >
              {options1}
        </Form.Control> 
        <Form.Label>Investment Amount</Form.Label> 
        <Form.Control
              as="select"
              value={investmentAmount}
              onChange={e => {
                setInvestmentAmount(e.target.value) }}
              >
              {options2}
        </Form.Control> 
        <Form.Label>Premium Type</Form.Label> 
        <Form.Control
              as="select"
              value={premiumtype}
              onChange={e => {
                setPremiumtype(e.target.value) }}
              >
              <option value="Yearly">Yearly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
        </Form.Control> 
        {showview?<>
          <hr></hr>
        <Form.Label>Premium Amount</Form.Label>
        <Form.Control type="text" value={premiumamount}
        /> 
        <Form.Label>Profit Ratio</Form.Label>
        <Form.Control type="text" value={profitratio}
        /> 
        <Form.Label>Total Sum Assured</Form.Label>
        <Form.Control type="text" value={sumassured}
        /> 
        </>:<></>}
        
        
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {showview?<>
          <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={buyPlan}>
          Buy Now
        </Button></>:<>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={calculate}>
          Calculate
        </Button></>}
        
      </Modal.Footer>
    </Modal>

    </>
  )
}

export default HomeScheme
