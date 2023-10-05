import React from 'react';
import './CustomerDashBoard.css';
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../sharedComponents/NavBar';
import { authenticateCustomer } from '../../services/Authentication';

const CustomerDashBoard = () => {

  const username = useParams().username
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("auth")
  const [claimCount,setClaimCount] = useState(0)
  const [policyCount,setPolicyCount] = useState(0)
   const navigation = useNavigate()

   const authenticate =  () =>{
    if(!authenticateCustomer(username))
    navigation('/')
  }
  useEffect(() =>  {
    authenticate()
  },[])


  
  const getClaimCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/customerapp/getCustomersClaimCount/${username}`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setClaimCount(response.data)
    } catch (error) {
      
    }
   
  }

  const getPolicyCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/customerapp/getCustomersPolicyCount/${username}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    console.log(response.data)
    setPolicyCount(response.data)
    } catch (error) {
      
    }
    
  }

  useEffect(() =>{
    getClaimCount()
    getPolicyCount()
  },[])

  const handleDocuments = async (e) =>{
    e.preventDefault()
    let response = await axios.get(`http://localhost:8086/customerapp/getId/${username}`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
    })
    navigation(`/documents/${username}/${response.data}`)
  }


  return (
    <>
    <NavBar role ={role} username = {username}/>
    <div className="ashboard-container background">
      <div className="upper-row">
     
        <div className="board-card file-card">
          <h2>Profile</h2>
          <span role="img" aria-label="Profile Emoji" className="emoji">😎</span>
          <p onClick={() => navigation(`/customerProfile/${username}`)}>View</p>
        </div>
        <div className="board-card cy-card">
          <h2>Policy</h2>
          <span role="img" aria-label="Customer Emoji" className="emoji">📜</span>
          <h6>Your Policies: {policyCount}</h6>
          <p  onClick={() => navigation(`/policy/${username}`)}>View</p>
        </div>
        <div className="board-card caim-card">
          <h2>Claim</h2>
          <span role="img" aria-label="Agent Emoji" className="emoji">📝</span>
          <h6>Your Claims: {claimCount} </h6>
          <p  onClick={() => navigation(`/customerClaims/${username}`)}>View</p>
        </div>
      </div>
      <div className="lower-row">
        <div className="board-card documnt-card">
          <h2>Documents</h2>
          <span role="img" aria-label="Customer Emoji" className="emoji">🗄️</span>
         
          <p  onClick={handleDocuments}>View</p>
        </div>
        <div className="board-card pxxy-card">
          <h2>Plans</h2>
          <span role="img" aria-label="Query Emoji" className="emoji">📃</span>
          <p onClick={() => navigation(`/plan/${username}`)}>View</p>
        </div>

        <div className="board-card common-card">
          <h2>Query</h2>
        
          <span role="img" aria-label="Query Emoji" className="emoji">📧</span>
          <p  onClick={() => navigation(`/query/${username}`)}>View</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CustomerDashBoard;
