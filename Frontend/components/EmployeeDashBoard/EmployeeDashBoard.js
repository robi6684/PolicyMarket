import React from 'react';
import './EmployeeDashBoard.css';

import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../sharedComponents/NavBar';
import { authenticateEmployee } from '../../services/Authentication';

const EmployeeDashBoard = () => {

  const username = useParams().username
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("auth")
  const [customerCount,setCustomerCount] = useState(0) 
  const [agentCount,setAgentCount] = useState(0)
  const [queryCount,setQueryCount] = useState(0)
  const navigation = useNavigate()

  const authenticate = () =>{
    if(!authenticateEmployee(username)) 
    navigation('/')
  }
  useEffect(() =>  {
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


  const getQueryCount = async () =>{
    try {
      
    let response = await axios.get(`http://localhost:8086/queryapp/count`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    console.log(response.data)
    setQueryCount(response.data)
    } catch (error) {
      
    }

  }

useEffect(() =>{
  getCustomersCount()
  getAgentCount()
  getQueryCount()
},[])





  return (

    <div>
     <NavBar role ={role} username = {username}/>

    <div className="dahboard-container background">
      <div className="upper-row">
     
        <div className="dashboard-card profile-card">
          <h2>Profile</h2>
          <span role="img" aria-label="Profile Emoji" className="emoji">😎</span>
          <p onClick={() =>navigation(`/employeeProfile/${username}`)}>View</p>
        </div>
       
        <div className="dashboard-card policy-card">
          <h2>Agents</h2>
          <span role="img" aria-label="Agent Emoji" className="emoji">🕵</span>
          <h6>Total Agents: {agentCount}</h6>
          <p onClick={() => navigation(`/agent/${username}`)}>View</p>
        </div>
      </div>
      <div className="lower-row">
        <div className="dashboard-card marketing-card">
          <h2>Customers</h2>
          <span role="img" aria-label="Customer Emoji" className="emoji">👥</span>
          <h6>Total Customers: {customerCount}</h6>
          <p onClick={() =>navigation(`/customer/${username}`)}>View</p>
        </div>
        <div className="dashboard-card commission-card">
          <h2>Queries</h2>
          <span role="img" aria-label="Query Emoji" className="emoji">📧</span>
          <h6>Total Queries: {queryCount} </h6>
          <p onClick={() =>  navigation(`/employeeQuery/${username}`)}>View</p>
        </div>
      </div>
    </div>

</div>
  );
};

export default EmployeeDashBoard;
