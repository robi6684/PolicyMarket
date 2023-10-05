import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../sharedComponents/NavBar'
import './AgentDashBoard.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { authenticateAgent } from '../../services/Authentication'

const AgentDashBoard = () => {
  const username = useParams().username
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("auth")
  const [cusrtomerCount,setCustomerCount] = useState(0) 
  const [commission,setCommission] = useState(0)
  const [policies,setPolicies] = useState(0)
  const navigation = useNavigate()

  const authenticate =  () =>{
    if(!authenticateAgent(username))
    navigation('/')
  }
  useEffect(() =>  {
    authenticate()
  },[])

  const getCustomersCount = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/agentapp/getCustomersCount/${username}`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setCustomerCount(response.data)
    } catch (error) {
      
    }
   
  }

  const getCommission = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/agentapp/commission/${username}`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setCommission(response.data)
    } catch (error) {
      
    }
   
  }

  
  const getPolicies = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/agentapp/getAgentPolicies/${username}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    console.log(response.data)
    setPolicies(response.data)
    } catch (error) {
      
    }
    
  }

useEffect(() =>{
  getCustomersCount()
  getCommission()
  getPolicies()
},[])

  return (
    <div>
      <NavBar role ={role} username = {username}/>
      <div className="dhboard-container background">
      <div className="uer-row">
     
        <div className="dhboard-card pro-card">
          <h2>Profile</h2>
          <span role="img" aria-label="Profile Emoji" className="emoji">😎</span>
          <p onClick={() =>{navigation(`/agentProfile/${username}`)}}>View More</p>
        </div>
        <div className="dhboard-card custo-card">
          <h2>Customer</h2>
          <span role="img" aria-label="Customer Emoji" className="emoji">👥</span>
          <h6>Total Customers: {cusrtomerCount} </h6> 
          <p onClick={() =>{navigation(`/agentCustomers/${username}`)}}>View More</p>
        </div>
        <div className="dhboard-card poli-card">
          <h2>Register Policy</h2>
          <span role="img" aria-label="Policy Emoji" className="emoji">📜</span>
          <h6>Total Policy Registered: {policies} </h6> 
          <p onClick={() =>{navigation(`/plan/${username}`)}}>View More</p>
        </div>
      </div>
      <div className="low-row">
        <div className="dhboard-card marketin-card">
          <h2>Marketing</h2>
          <span role="img" aria-label="Marketing Emoji" className="emoji">🎉</span>
          <p onClick={() =>{navigation(`/marketing/${username}`)}}>View More</p>
        </div>
        <div className="dhboard-card ommission-card">
          <h2>Commision</h2>
          <span role="img" aria-label="Commission Emoji" className="emoji">💰</span>
          <h6>Total Commision: {commission}</h6>
          <p onClick={() =>{navigation(`/commission/${username}`)}}>View More</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AgentDashBoard
