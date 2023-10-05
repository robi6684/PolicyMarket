import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../sharedComponents/Error'
import Pagination from '../sharedComponents/Pagination'
import Table from '../sharedComponents/Table'
import { Button, Modal, Form} from 'react-bootstrap'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import { authenticateAdmin } from '../../services/Authentication'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { getScheme } from '../../services/SchemeApi'
import './Scheme.css'
import axios from "axios"
import { upload } from '@testing-library/user-event/dist/upload'
import { Spinner } from '../Spinner'

const Scheme = () => {
  const planid = useParams().planid
  const username = useParams().username
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")

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
  const authenticate = () =>{
    if(localStorage.getItem("name") !== username)
    navigation('/')
  }
  useEffect(() =>{
    authenticate()
  },[])


//   const authenticate =  () =>{
//     if(!authenticateAdmin())
//     navigation('/')
//   }
//   useEffect(() =>  {
//     authenticate()
//   },[])

const getCustomer = async () => {
  try {
    let response = await axios.get('http://localhost:8086/customerapp/getAllCustomers',
    {
      params: {
        pageno: currentPage-1,
        pagesize: custsize,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
   )
   setVal(response.data.content)
   setCustomerusername(response.data.content[0].username)
   setCustSize(response.data.totalElements)
  } catch (error) {
    
  }

}

useEffect(() =>{
  getCustomer()
},[custsize])


  const getAllSchemes = async () => {
    
    try {   
      let response = await getScheme(currentPage,size,planid,token)
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


  const handleUpdate = async (d) => {
    // setSalary(d.salary)
    // setEmployeeid(d.employeeid)
    // setShow(true)
  }

  const update = async () =>{
    // if(typeof salary === 'undefined' || salary === '' ){
    //     Swal.fire({  
    //         title: "Fields are empty",
    //         text: "Please fill the fields",
    //         icon: "error",
    //         confirmButtonText: "OK", 
    //       });  
    //       return;
    // }
    // try {
    //  await updateSalary(employeeid,salary,token)
  
    //   Swal.fire({  
    //     title: "Salary updated successfully",
    //     icon: "success",
    //     confirmButtonText: "OK", 
    //   }).then(function() {
    //     window.location.reload(false)
    //   });  
    // } catch (error) {
    // }

  }

  
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
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:8086/fileapp/upload/${username}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Handle the response from the server as needed
      console.log('Upload successful:', response);
      Swal.fire({  
        title: "Upload successful",
        icon: "success",
        confirmButtonText: "OK", 
      });  
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    
  }

  const buyPlan = async () =>{
    if(role == "ROLE_AGENT"){
      let response = await axios.get(`http://localhost:8086/customerapp/getStatus/${customerusername}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if(response.data !== 'Verified'){
      Swal.fire({  
        title: "Your document is not verified",
        text : "Please wait for document verification",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return
    }
    let response1 = await axios.get(`http://localhost:8086/customerapp/getAge/${customerusername}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response1.data)
    console.log(minage)
    console.log(maxage)

    if(!(response1.data>=minage &&response1.data<=maxage)){
      Swal.fire({  
        title: "Age Restricted",
        text : "You are not in this age group",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return
    }
    const object ={
      schemeid : schemeid,
      schemename : schemename,
      name : customerusername,
      investmentAmount : investmentAmount,
      investmentYear : investmentYear,
      premiumtype : premiumtype,
      profitratio : profitratio
    }
  if(object){
    navigation(`/buyplan/${username}/`+ encodeURIComponent(JSON.stringify(object)))
  }
  return
    }
    let response = await axios.get(`http://localhost:8086/customerapp/getStatus/${username}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if(response.data !== 'Verified'){
      Swal.fire({  
        title: "Your document is not verified",
        text : "Please wait for document verification",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return
    }
    let response1 = await axios.get(`http://localhost:8086/customerapp/getAge/${username}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response1.data)
    console.log(minage)
    console.log(maxage)

    if(!(response1.data>=minage &&response1.data<=maxage)){
      Swal.fire({  
        title: "Age Restricted",
        text : "You are not in this age group",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return
    }
    const object ={
      schemeid : schemeid,
      schemename : schemename,
      investmentAmount : investmentAmount,
      investmentYear : investmentYear,
      premiumtype : premiumtype,
      profitratio : profitratio
    }
  if(object){
    navigation(`/buyplan/${username}/`+ encodeURIComponent(JSON.stringify(object)))
  }
   
  }

  const handleDownload = async (d) => {
    try {
      const response = await axios.get(`http://localhost:8086/schemefileapp/download/${d.schemeid}`, {
        responseType: 'blob',// Set the response type to 'blob' for binary data
        headers: {
            Authorization: `Bearer ${token}`
          }
         
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

const hanldeEdit = (d) =>{
  setMinAmount(d.minamount)
  setMaxAmount(d.maxamount)
  setMinage(d.minage)
  setMaxage(d.maxage)
  setMininvestime(d.mininvesttime)
  setMaxinvesttime(d.maxinvesttime)
  setProfitratio(d.profitratio)
  setRegistrationcommission(d.registrationcommission)
  setSchemeName(d.schemename)
  setSchemeId(d.schemeid)
  setUpdateModalShow(true)
  setSelectedFile(null)
}

const handleUpdateScheme = async () =>{
  if(typeof schemename === 'undefined' || schemename === '' ||
  typeof minage === 'undefined' || minage === '' ||
  typeof maxage === 'undefined' || maxage === '' ||
  typeof minamount === 'undefined' || minamount === '' ||
  typeof maxamount === 'undefined' || maxamount === '' ||
  typeof mininvesttime === 'undefined' || mininvesttime === '' ||
  typeof maxinvesttime === 'undefined' || maxinvesttime === '' ||
  typeof profitratio === 'undefined' || profitratio === '' ||
  typeof registrationcommission === 'undefined' || registrationcommission === '')
  {
    Swal.fire({  
        title: "Fields are empty",
        text: "Please fill the fields",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  }
  const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidName = namePattern.test(schemename);
    if(!isValidName){
      Swal.fire({  
        title: "Invalid Scheme Name",
        text: "Please enter correct Scheme name",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const minAgePattern = 5;
    if(minage < minAgePattern){
      Swal.fire({  
        title: "Invalid Minimum Age",
        text: "Age must be above 5",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const maxAgePattern = 80;
    if(maxage > maxAgePattern){
      Swal.fire({  
        title: "Invalid Maximum Age",
        text: "Age must be below 80",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const salaryPattern = /^-?\d+(\.\d+)?$/;
    if(!salaryPattern.test(maxamount)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter Correct  amount Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    if(!salaryPattern.test(minamount)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter Correct amount Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    const isValidMinimumTime= /^[1-9]\d*$/.test(mininvesttime);
    if(!isValidMinimumTime){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct invest time Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    const isValidMaxmumTime= /^[1-9]\d*$/.test(maxinvesttime);
    if(!isValidMaxmumTime){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct invest time Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
  
    if(!salaryPattern.test(profitratio)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct profit ratio value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    if(!salaryPattern.test(registrationcommission)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct registratin commission value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }

  try {
    
    let response = await axios.put(`http://localhost:8086/schemeapp/update/${schemeid}`,{
      schemename,
      minage,
      maxage,
      profitratio,
      minamount,
      maxamount,
      mininvesttime,
      maxinvesttime,
      registrationcommission
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if(selectedFile !== null){
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
    
          try {
            const response = await fetch(`http://localhost:8086/schemefileapp/update/${schemeid}`, {
              method: 'PUT',
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          } catch (error) {
            console.error('Error uploading file:', error);
          }
          
        }
    
    }
    

    Swal.fire({  
      title: "Scheme Updated Successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(async function() {
      setUpdateModalShow(false)
      await getAllSchemes()
    });  
  } catch (error) {
    Swal.fire({  
      title: "Scheme Already Exists",
      icon: "error",
      confirmButtonText: "OK", 
    });
  }
}
  const headers = []
  const functions = []
  const functionHeaders = []
  if(role == "ROLE_ADMIN"){
    headers.push("Name","Min age", "Max Age", "Min Amount", "Max Amount", "Min Invest Time"
    ,"Max Invest Time", "Profit Ratio","Commission")
    functions.push(handleDownload,hanldeEdit)
    functionHeaders.push("Brochure","Update")
  }
  else{
    headers.push("Name","Min age", "Max Age", "Min Amount", "Max Amount", "Min Invest Time"
    ,"Max Invest Time", "Profit Ratio")
    functions.push(handleDownload,handleBuy)
    functionHeaders.push("Brochure","Calculate")
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
        const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch(`http://localhost:8086/schemefileapp/upload/${schemename}`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Handle the response from the server as needed
        console.log('Upload successful:', response);
        //alert("Upload Successfull")
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      
    }
  };

  const handleAddScheme = async () =>{
    if(typeof schemename === 'undefined' || schemename === '' ||
    typeof minage === 'undefined' || minage === '' ||
    typeof maxage === 'undefined' || maxage === '' ||
    typeof minamount === 'undefined' || minamount === '' ||
    typeof maxiamount === 'undefined' || maxiamount === '' ||
    typeof mininvesttime === 'undefined' || mininvesttime === '' ||
    typeof maxinvesttime === 'undefined' || maxinvesttime === '' ||
    typeof profitratio === 'undefined' || profitratio === '' ||
    typeof registrationcommission === 'undefined' || registrationcommission === '')
    {
      Swal.fire({  
          title: "Fields are empty",
          text: "Please fill the fields",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
    }
    if(selectedFile === null){
      Swal.fire({  
        title: "No file uploaded",
        text: "Please upload brochure",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }
    const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidName = namePattern.test(schemename);
    if(!isValidName){
      Swal.fire({  
        title: "Invalid Scheme Name",
        text: "Please enter correct Scheme name",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const minAgePattern = 5;
    if(minage < minAgePattern){
      Swal.fire({  
        title: "Invalid Minimum Age",
        text: "Age must be above 5",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const maxAgePattern = 80;
    if(maxage > maxAgePattern){
      Swal.fire({  
        title: "Invalid Maximum Age",
        text: "Age must be below 80",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
    }

    const salaryPattern = /^-?\d+(\.\d+)?$/;
    if(!salaryPattern.test(maxiamount)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter Correct  amount Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    if(!salaryPattern.test(minamount)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter Correct amount Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    const isValidMinimumTime= /^[1-9]\d*$/.test(mininvesttime);
    if(!isValidMinimumTime){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct invest time Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    const isValidMaxmumTime= /^[1-9]\d*$/.test(maxinvesttime);
    if(!isValidMaxmumTime){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct invest time Value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
  
    if(!salaryPattern.test(profitratio)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct profit ratio value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }
  
    if(!salaryPattern.test(registrationcommission)){
      Swal.fire({  
        title: "Incorrect Value",
        text: "Enter correct registratin commission value",
        icon: "error",
        confirmButtonText: "OK", 
      });  
      return;
  
    }


    try {
      
      let response = await axios.post(`http://localhost:8086/schemeapp/save/${planid}`,{
        schemename,
        minage,
        maxage,
        profitratio,
        minamount,
        maxamount:maxiamount,
        mininvesttime,
        maxinvesttime,
        registrationcommission
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      await handleUpload()
      Swal.fire({  
        title: "Scheme Added Successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(async function() {
        handleModalClose(false)
        await getAllSchemes()
      });  
    } catch (error) {
      Swal.fire({  
        title: "Scheme Already Exists",
        icon: "error",
        confirmButtonText: "OK", 
      });
      
    }

  }

  const handleAadhar = (event) =>{
    setAadharCard(event.target.files[0]);
  }
  const handlePan = (event) =>{
    setPanCard(event.target.files[0]);
  }
  const handleVoter = (event) =>{
    setVoterCard(event.target.files[0]);
  }

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



  let options
    if(val.length > 0){
        options = val.map((d) =>{
        return(
            <>
          <option value={d.username}>{d.username}</option>
            </>
        )
        }
        )
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
    <div className='background'>
    <NavBar role={role} username={username}/>
    <button class="button-arounder" onClick={() => navigation(-1)}>Go Back</button>
    <h1>Schemes</h1>
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
    </div>

      {
        role=="ROLE_ADMIN"?<> <Button className='button' variant="primary" onClick={() =>
          {
          setModalShow(true)
          setMinAmount('')
          setMaxAmount('')
          setMinage('')
          setMaxage('')
          setMininvestime('')
          setMaxinvesttime('')
          setSchemeName('')
          setSchemeId('')
          setProfitratio('')
          setRegistrationcommission('')
        }} style={{marginLeft:'40%'}}> Add New Scheme</Button></>:<><hr></hr><br></br></>
      }
       
    

    <Modal show={modalshow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <Form.Label>Scheme Name*</Form.Label>
        <Form.Control type="text"  onChange={(e) => setSchemeName(e.target.value)}
        />     
        <Form.Label>Minimum Age*</Form.Label>
        <Form.Control type="text" onChange={(e) => setMinage(e.target.value)} 
        />
        <Form.Label>Maximum Age*</Form.Label>
        <Form.Control type="text"  onChange={(e) => setMaxage(e.target.value)}
        />     
        <Form.Label>Minimum Amount*</Form.Label>
        <Form.Control type="text" onChange={(e) => setMinAmount(e.target.value)} 
        /> 
       <Form.Label>Maximum Amount*</Form.Label>
        <Form.Control type="text" onChange={(e) => setMaxiamount(e.target.value)}
        />   
        <Form.Label>Minimum Invest Time*</Form.Label>
        <Form.Control type="text" onChange={(e) => setMininvestime(e.target.value)} 
        />
        <Form.Label>Maximum Invest Time*</Form.Label>
        <Form.Control type="text"  onChange={(e) => setMaxinvesttime(e.target.value)}
        />     
        <Form.Label>Profit Ratio*</Form.Label>
        <Form.Control type="text" onChange={(e) => setProfitratio(e.target.value)} 
        /> 
        <Form.Label>Registration Commission*</Form.Label>
        <Form.Control type="text" onChange={(e) => setRegistrationcommission(e.target.value)} 
        /> 
       <Form.Label>Upload Brochure*</Form.Label><br></br>
        <input type="file" onChange={handleFileChange} />    
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddScheme}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={updateModalShow} onHide={updateModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <Form.Label>Scheme Name</Form.Label>
        <Form.Control type="text"  onChange={(e) => setSchemeName(e.target.value)}
        value={schemename}
        />     
        <Form.Label>Minimum Age</Form.Label>
        <Form.Control type="text" onChange={(e) => setMinage(e.target.value)} 
        value={minage}
        />
        <Form.Label>Maximum Age</Form.Label>
        <Form.Control type="text"  onChange={(e) => setMaxage(e.target.value)}
        value={maxage}
        />     
        <Form.Label>Minimum Amount</Form.Label>
        <Form.Control type="text" onChange={(e) => setMinAmount(e.target.value)} 
        value={minamount}
        /> 
        <Form.Label>Maximum Amount</Form.Label>
        <Form.Control type="text" onChange={(e) => setMaxAmount(e.target.value)} 
        value={maxamount}
        />   
        <Form.Label>Minimum Invest Time</Form.Label>
        <Form.Control type="text" onChange={(e) => setMininvestime(e.target.value)} 
        value={mininvesttime}
        />
        <Form.Label>Maximum Invest Time</Form.Label>
        <Form.Control type="text"  onChange={(e) => setMaxinvesttime(e.target.value)}
        value={maxinvesttime}
        />     
        <Form.Label>Profit Ratio</Form.Label>
        <Form.Control type="text" onChange={(e) => setProfitratio(e.target.value)} 
        value={profitratio}
        /> 
        <Form.Label>Registration Commission</Form.Label>
        <Form.Control type="text" onChange={(e) => setRegistrationcommission(e.target.value)} 
        value={registrationcommission}
        /> 
       <Form.Label>Upload Brochure</Form.Label><br></br>
        <input type="file" onChange={handleFileChange} />    
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={updateModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdateScheme}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={show} onHide={handleClose}  
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Interest Calculator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        {role=="ROLE_AGENT"?<>
        <Form.Label>Select Customer</Form.Label>
        <Form.Control
        as="select"
        value={customerusername}
        onChange={e => {
        setCustomerusername(e.target.value) }}
        >
        {options}
        </Form.Control> 
        </>:<></>}
       
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

    <Modal show={show1} onHide={handleClose1}  
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Fill the Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group >
        <h4>Upload Documents</h4><br></br>
        <Form.Label>Aadhar Card</Form.Label><br></br>
        <input type="file" onChange={handleAadhar} />
        <button onClick={() => uploadDocuments(aadharCard)}>Upload</button> <br></br>
        <Form.Label>Pan Card</Form.Label><br></br>
        <input type="file" onChange={handlePan} /> 
        <button onClick={() => uploadDocuments(panCard)}>Upload</button> <br></br>
        <Form.Label>Voter Card</Form.Label><br></br>
        <input type="file" onChange={handleVoter} /> 
        <button onClick={() => uploadDocuments(voterCard)}>Upload</button> <br></br>
        <hr></hr>

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
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
          Cancel
        </Button>
        <Button variant="primary" onClick={buyPlan}>
          Proceed to Payment
        </Button>
      </Modal.Footer>
    </Modal>
   </div>
  )
}

export default Scheme
