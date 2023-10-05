import React from 'react';
import './AdminDashBoard.css';

import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../sharedComponents/NavBar';
import { authenticateAdmin } from '../../services/Authentication';

const AdminDashBoard = () => {


  const username = useParams().username
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("auth")
  const [customerCount,setCustomerCount] = useState(0) 
  const [agentCount,setAgentCount] = useState(0)
  const [employeeCount,setEmployeeCount] = useState(0)
  const [planCount,setPlanCount] = useState(0)
  const [paymentCount,setPaymentCount] = useState(0)
  const [claimCount,setClaimCount] = useState(0)
  const navigation = useNavigate()

  const authenticate = () =>{
    if(!(authenticateAdmin(username))){
      navigation(`/`)
    }
  }
 
  useEffect(() =>{
    authenticate()
  },[])


  const getCustomersCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/customerapp/count`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setCustomerCount(response.data)
    } catch (error) {
      
    }

   
  }

  const getClaimCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/claimapp/count`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setClaimCount(response.data)
    } catch (error) {
      
    }
 
  }

  const getAgentCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/agentapp/count`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setAgentCount(response.data)
    } catch (error) {
      
    }
 
  }


  const getEmployeeCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/employeeapp/count`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setEmployeeCount(response.data)
    } catch (error) {
      
    }
 
  }

  const getPlanCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/planapp/count`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setPlanCount(response.data)
      
    } catch (error) {
      
    }
 
  }

  const getPaymentCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/paymentapp/count`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setPaymentCount(response.data)
      
    } catch (error) {
      
    }

  }


useEffect(() =>{
  getCustomersCount()
  getAgentCount()
  getEmployeeCount()
  getPlanCount()
  getPaymentCount()
  getClaimCount()
},[])




  return (
    <div>
     <NavBar role ={role} username = {username}/>
    <div className="dboard-container background">
      <div className="upper-row">
     
        <div className="dboard-card p-card">
          <h2>Profile</h2>
          <span role="img" aria-label="Profile Emoji" className="emoji">😎</span>
          <p onClick={() => navigation(`/adminProfile/${username}`)}>View</p>
        </div>
        <div className="dboard-card olicy-card">
          <h2>Plan</h2>
          <span role="img" aria-label="Customer Emoji" className="emoji">📜</span>
          <h6>Total Plans: {planCount} </h6>
          <p onClick={() => navigation(`/plan/${username}`)}>View</p>
        </div>
        <div className="dboard-card em-card">
          <h2>Employee</h2>
          <span role="img" aria-label="Employee Emoji" className="emoji">👨🏽‍💼</span>
          <h6>Total Employees: {employeeCount} </h6>
          <p onClick={() => navigation(`/employee/${username}`)}>View</p>
        </div>
        <div className="dboard-card a-card">
          <h2>Agent</h2>
          <span role="img" aria-label="Agent Emoji" className="emoji">🕵</span>
          <h6>Total Agents: {agentCount} </h6>
          <p onClick={() => navigation(`/agent/${username}`)}>View</p>
        </div>
      </div>
      <div className="lower-row">
        <div className="dboard-card c-card">
          <h2>Customer</h2>
          <span role="img" aria-label="Customer Emoji" className="emoji">👥</span>
          <h6>Total Customers: {customerCount}</h6>
          <p onClick={() => navigation(`/customer/${username}`)}>View</p>
        </div>
        <div className="dboard-card pay-card">
          <h2>Payments</h2>
          <span role="img" aria-label="Payment Emoji" className="emoji">💳</span>
          <h6>Total Payments: {paymentCount} </h6>
          <p onClick={() => navigation(`/payment/${username}`)}>View</p>
        </div>
        <div className="dboard-card aim-card">
          <h2>Claims</h2>
          <span role="img" aria-label="Claim Emoji" className="emoji">📃</span>
          <h6>Total Claims: {claimCount} </h6>
          <p onClick={() => navigation(`/claim/${username}`)}>View</p>
        </div>

        <div className="dboard-card whdrawl-card">
          <h2>Withdrawal</h2>
         
          <span role="img" aria-label="Withdrawl Emoji" className="emoji">💵</span>
          <p onClick={() => navigation(`/withdrawal/${username}`)}>View</p>
        </div>
      </div>
    </div>

</div>
  );
};

export default AdminDashBoard;
