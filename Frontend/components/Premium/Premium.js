import React from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import NavBar from '../sharedComponents/NavBar'
import './Premium.css'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'

const Premium = () => {
    const username = useParams().username
    const token = localStorage.getItem("auth")
    const policynumber = useParams().policynumber
    const amount = useParams().amount
    const role = localStorage.getItem("role")
    const navigation = useNavigate()
    const [data,setData] = useState([])
    const [checkStatus,setCheckStatus] = useState("Claimed")
    const [policyStatus,setPolicystatus] = useState()

    const authenticate = () =>{
      if(localStorage.getItem("name") !== username)
      navigation('/')
    }
    useEffect(() =>{
      authenticate()
    },[])
  

    const getPremiums = async () =>{
      try {
        let response = await axios.get(`http://localhost:8086/policyapp/getPremiums/${policynumber}`,{
          headers:{
              Authorization: `Bearer ${token}`
          }
      })
      setData(response.data)
      } catch (error) {
        
      }
      
    }
    const getClaimStatus = async () =>{
      try {
        let response = await axios.get(`http://localhost:8086/claimapp/getStatus/${policynumber}`,{
          headers:{
              Authorization: `Bearer ${token}`
          }
      })
      setCheckStatus(response.data)
      } catch (error) {
        
      }
     
  }
  const getPolicyStatus = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/policyapp/getStatus/${policynumber}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    setPolicystatus(response.data)
    } catch (error) {
      
    }
    
}


    useEffect(() =>{
        getPremiums()
        getClaimStatus()
        getPolicyStatus()
    },[])

    const handlePay = () =>{
        navigation(`/premiumpayment/${username}/${policynumber}`)
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[accountnumber,setAccountNumber] = useState()
    const[ifsccode,setIfscCode] = useState()


    let rowDataElements = data.map((d) =>{
        return(
            <tr>
                <td>{d.date}</td>
                <td>{d.status}</td>
                <td>{d.pay == "Pay" ? <><button onClick={handlePay} className='btn btn-primary'>Pay Now</button></>:<>{d.pay}</>}</td>
            </tr>
        )
    })
    const claim = async () =>{
      if(typeof accountnumber == 'undefined' || accountnumber == ''
      || typeof ifsccode == 'undefined' || ifsccode == ''){
        Swal.fire({  
          title: "Fields are empty",
          text: "Please fill the fields",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return
      }

      const isValidAccountNumber = /^[1-9]\d*$/.test(accountnumber);
      if(!isValidAccountNumber){
        Swal.fire({  
          title: "Incorrect Account Number",
          text: "Please fill the correct Account Number",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return
  
      }
  
      const isValidIFSCCode = /^[a-zA-Z0-9]+$/.test(ifsccode);
      if(!isValidIFSCCode){
        Swal.fire({  
          title: "Incorrect Ifsc Code",
          text: "Please fill the correct Ifsc code",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return
  
      }
      try {
        let response = await axios.post(`http://localhost:8086/claimapp/save/${username}/${policynumber}`,{
          accountnumber,
          ifsccode
          }
          ,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        Swal.fire({  
          title: "Claim request sent successfully",
          icon: "success",
          confirmButtonText: "OK", 
        }).then(async function() {
          setShow(false)
          await getPolicyStatus()
        });  
      } catch (error) {
        Swal.fire({  
          title: "Length of A/C No.",
          icon: "error",
          confirmButtonText: "OK", 
        });
      }
    
    }
  return (
    <>
    <div className='back'>
    <NavBar role={role} username={username}></NavBar>
    <button class="button-arounder" onClick={() => navigation(-1)}>Go Back</button>
    <h1 className='heading'>Premiums</h1>
    <div className='premium'>
      <hr></hr>
    
    
        <div>
      <table className="table">
    <thead>
      <tr>
        <th>Premium Date</th>
        <th>Status</th>
        <th>Pay Premium</th>
      </tr>
    </thead>
    <tbody >
      {rowDataElements}
    </tbody>
    </table>
    </div>
    {checkStatus=="Pending"?<><hr></hr><br></br></>:<>
    {policyStatus=="Not Claimed"?<>
    <button className='button' onClick={() =>setShow(true)} style={{marginLeft:'40%'}}>Claim</button>
    </>:<>
    <h4 style={{color:'#005bff'}}>Claim Status : {policyStatus}</h4>
    </>}
   
    </>}
    
    </div>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill the details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
              <Form.Label>Account Number</Form.Label>
              <Form.Control type="text"  onChange={(e) => setAccountNumber(e.target.value)}
              />
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control type="text"  onChange={(e) => setIfscCode(e.target.value)}
              />           
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={claim}>
            Claim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  )
}

export default Premium
