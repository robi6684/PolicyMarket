import React, { useState } from 'react'
import './QueryForm.css';
import { useNavigate, useParams } from 'react-router';
import NavBar from '../sharedComponents/NavBar';
import axios from "axios"
import Swal from 'sweetalert2'
import { authenticateCustomer } from '../../services/Authentication';
import { useEffect } from 'react';

const QueryForm = () => {

const role = localStorage.getItem("role")
const username = useParams().username
const token = localStorage.getItem("auth")
const [email, setEmail] = useState('');
const [query, setQuery] = useState('');
const navigation = useNavigate() 

const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handleQueryChange = (event) => {
setQuery(event.target.value);
};

const authenticate =  () =>{
  if(!authenticateCustomer(username))
  navigation('/')
}
useEffect(() =>  {
  authenticate()
},[])



const handleSend = async () =>{
  if(email == '' || typeof email == 'undefined' ||
  query == '' || typeof query == 'undefined'){
    Swal.fire({  
      title: "Fields are empty",
      text: "Please fill the fields",
      icon: "error",
      confirmButtonText: "OK", 
    });
    return;  
  }
    let response = await axios.post(`http://localhost:8086/queryapp/save`,{
        email,
        content : query
    },
    {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    Swal.fire({  
        title: "Query Sent Successfully",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(function () {
        window.location.reload(false)
      });  
return
}


  return (
    <div className='background'>
    <NavBar role={role} username={username}/>
    <div>
      <h1 className="heading">Write Your Query</h1>
      <div className='container'>
      <hr></hr>
      <form className='queryForm'>
        
        <div className="form-group">
          {/* <label>Your Email</label> */}
          <input
            type="email"
            value={email}
            placeholder="Your Email*"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label>Your Query</label> */}
          <textarea
            value={query}
            placeholder="Your Query*"
            onChange={handleQueryChange}
            rows="6"
            required
          />
        </div>
        
      </form>
      </div>
    </div>
    <button className ="button" style={{marginLeft:'45%'}}onClick={() => handleSend()}>Send</button>
    </div>
  )
}

export default QueryForm