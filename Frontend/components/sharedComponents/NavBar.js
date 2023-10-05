import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './NavBar.css'
import axios from 'axios'

const NavBar = ({role,username}) => {

  const token = localStorage.getItem("auth")
    let navigation = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        navigation('/')
        return
    }

    const handleAdminDashBoard = (e) =>{
      e.preventDefault()
      navigation(`/adminDashBoard/${username}`)
    }

    const handleEmployeeDashBoard = (e) =>{
      e.preventDefault()
      navigation(`/employeeDashBoard/${username}`)
    }

    const hanldePlans = (e) =>{
      e.preventDefault()
      navigation(`/plan/${username}`)
    }
    const handleEmployee = (e) =>{
      e.preventDefault()
      navigation(`/employee/${username}`)
    }
    const handleAgent = (e) =>{
      e.preventDefault()
      navigation(`/agent/${username}`)
      
    }
    const handleCustomer = (e) =>{
      e.preventDefault()
      navigation(`/customer/${username}`)
      
    }
    const handlePayment = (e) =>{
      e.preventDefault()
      navigation(`/payment/${username}`)
    }
    const handleClaim = (e) =>{
      e.preventDefault()
      navigation(`/claim/${username}`)
    }
    const hanldeWithdrawal = (e) =>{
      e.preventDefault()
      navigation(`/withdrawal/${username}`)
    }
    const handlePolicies = (e) =>{
      e.preventDefault()
      navigation(`/policy/${username}`)
    }

    const handleProfile = (e) =>{
      e.preventDefault()
    }

    const handleQuery = (e) =>{
      e.preventDefault()
      navigation(`/query/${username}`)
    }

    const handleClaims = (e) =>{
      e.preventDefault()
      navigation(`/customerClaims/${username}`)
    }


    const handleAgentCustomers = (e) =>{
      e.preventDefault()
      navigation(`/agentCustomers/${username}`)
    }

    const handleAddPolicy = (e) =>{
      e.preventDefault()
      navigation(`/plan/${username}`)
    }

    const handleAgentProfile = (e) =>{
      e.preventDefault()
      navigation(`/agentProfile/${username}`)
    }

    const handleAgentDashBoard = (e) =>{
      e.preventDefault()
      navigation(`/agentDashBoard/${username}`)
    }

    const handleMarketing =  (e) =>{
      e.preventDefault()
      navigation(`/marketing/${username}`)
    }

    const handleCommission = (e) =>{
      e.preventDefault()
      navigation(`/commission/${username}`)
    }

    const handleEmployeeProfile = (e) =>{
      e.preventDefault()
      navigation(`/employeeProfile/${username}`)
    }

    const handleQueries = (e) =>{
      e.preventDefault()
      navigation(`/employeeQuery/${username}`)
    }

    const handleCustomerProfile = (e) =>{
      e.preventDefault()
      navigation(`/customerProfile/${username}`)
    }

    const handleCustomerDashBoard = (e) =>{
      e.preventDefault()
      navigation(`/customerDashBoard/${username}`)
    }

    const handleDocuments = async (e) =>{
      e.preventDefault()
      let response = await axios.get(`http://localhost:8086/customerapp/getId/${username}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
      })
      navigation(`/documents/${username}/${response.data}`)
    }


    if(role == "ROLE_ADMIN"){
        return (
            <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            
            <div className="collapse navItems navbar-collapse" id="navbarSupportedContent">
             
              <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                <li className="navList">
                  <a className="nav-link active" aria-current="page" href="#" onClick={handleAdminDashBoard}>Dashboard</a>
                </li>
                <li className="navList">
                <a className="nav-link active" href="#" onClick={hanldePlans}>Plans</a>
                </li>
                <li className="navList">
                <a className="nav-link active" href="#" onClick={handleEmployee}>Employees</a>
                </li>
                <li className="navList">
                  <a className="nav-link active" href="#" onClick={handleAgent}>Agents</a>
                </li>
                <li className="navList">
                <a className="nav-link active" href="#" onClick={handleCustomer}>Customers</a>
                </li>
                <li className="navList">
                  <a className="nav-link active" href="#" onClick={handlePayment}>Payments</a>
                </li>
                <li className="navList">
                <a className="nav-link active" href="#" onClick={handleClaim}>Claims</a>
                </li>
                <li className="navList">
                  <a className="nav-link active" href="#" onClick={hanldeWithdrawal}>Withdrawals</a>
                </li>
              </ul>
              <form className="d-flex">
                <button className="btn btn-danger" type="submit" onClick={handleLogout}>Logout</button>
              </form>
            </div>
          </div>
        </nav>
            </>
          
          )
    }
    if(role == "ROLE_CUSTOMER"){
      return (
          <>
          <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          
          <div className="collapse navItems navbar-collapse" id="navbarSupportedContent">
           
            <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
              <li className="navList">
                <a className="nav-link active" aria-current="page" href="#" onClick={handleCustomerDashBoard}>Dashboard</a>
              </li>
              <li className="navList">
              <a className="nav-link active" href="#" onClick={handleCustomerProfile}>Profile</a>
              </li>
              <li className="navList">
              <a className="nav-link active" href="#" onClick={hanldePlans}>Plans</a>
              </li>
              <li className="navList">
              <a className="nav-link active" href="#" onClick={handlePolicies}>Policies</a>
              </li>
              <li className="navList">
              <a className="nav-link active" href="#" onClick={handleDocuments}>Documents</a>
              </li>
              <li className="navList">
              <a className="nav-link active" href="#" onClick={handleClaims}>Claims</a>
              </li>
              <li className="navList">
              <a className="nav-link active" href="#" onClick={handleQuery}>Query</a>
              </li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-danger" type="submit" onClick={handleLogout}>Logout</button>
            </form>
          </div>
        </div>
      </nav>
          </>
        
        )
  }
  if(role == "ROLE_EMPLOYEE"){
    return (
        <>
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
        
        <div className="collapse navItems navbar-collapse" id="navbarSupportedContent">
         
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
            <li className="navList">
              <a className="nav-link active" aria-current="page" href="#" onClick={handleEmployeeDashBoard}>Dashboard</a>
            </li>
            <li className="navList">
            <a className="nav-link active" href="#" onClick={handleEmployeeProfile}>Profile</a>
            </li>
            <li className="navList">
            <a className="nav-link active" href="#" onClick={handleAgent}>Agents</a>
            </li>
            <li className="navList">
            <a className="nav-link active" href="#" onClick={handleCustomer}>Customers</a>
            </li>
            <li className="navList">
            <a className="nav-link active" href="#" onClick={handleQueries}>Query</a>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-danger" type="submit" onClick={handleLogout}>Logout</button>
          </form>
        </div>
      </div>
    </nav>
        </>
      
      )
}
if(role == "ROLE_AGENT"){
  return (
      <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      
      <div className="collapse navItems navbar-collapse" id="navbarSupportedContent">
       
        <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
          <li className="navList">
            <a className="nav-link active" aria-current="page" href="#" onClick={handleAgentDashBoard}>Dashboard</a>
          </li>
          <li className="navList">
          <a className="nav-link active" href="#" onClick={handleAgentProfile}>Profile</a>
          </li>
          <li className="navList">
          <a className="nav-link active" href="#" onClick={handleAgentCustomers}>Customers</a>
          </li>
          <li className="navList">
          <a className="nav-link active" href="#" onClick={handleAddPolicy}>Register Policy</a>
          </li>
          <li className="navList">
          <a className="nav-link active" href="#" onClick={handleMarketing}>Marketing</a>
          </li>
          <li className="navList">
          <a className="nav-link active" href="#" onClick={handleCommission}>Commission</a>
          </li>
        </ul>
        <form className="d-flex">
          <button className="btn btn-danger" type="submit" onClick={handleLogout}>Logout</button>
        </form>
      </div>
    </div>
  </nav>
      </>
    
    )
}
//   return (
//     <>
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <div className="container-fluid">
//     <a className="navbar-brand" href="#">Welcome, {username}</a>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navItems navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="navList">
//           <a className="nav-link active" aria-current="page" href="#" onClick={handleAccount}>Account</a>
//         </li>
//         <li className="navList">
//           <a className="nav-link active" href="#" onClick={handleTransaction}>Transaction</a>
//         </li>
//       </ul>
//       <form className="d-flex">
//         <button className="btn btn-danger" type="submit" onClick={handleLogout}>Logout</button>
//       </form>
//     </div>
//   </div>
// </nav>
//     </>
  
//   )
}

export default NavBar
