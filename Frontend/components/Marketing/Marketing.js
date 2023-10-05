import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import NavBar from '../sharedComponents/NavBar';
import axios from "axios"
import Swal from 'sweetalert2'
import { Spinner } from '../Spinner';
import { authenticateAgent } from '../../services/Authentication';

const Marketing = () => {

const role = localStorage.getItem("role")
const username = useParams().username
const token = localStorage.getItem("auth")
const [email, setEmail] = useState('');
const [query, setQuery] = useState('');
const navigation = useNavigate()

const authenticate =  () =>{
  if(!authenticateAgent(username))
  navigation('/')
}
useEffect(() =>  {
  authenticate()
},[])

const handleEmailChange = (event) => {
setEmail(event.target.value);
};

const handleQueryChange = (event) => {
setQuery(event.target.value);
};



const [loading,setLoading] = useState(true)
const handleSend = async () =>{
  setLoading(false)
  if(typeof email == 'undefined' || email == '' ||
  typeof query == 'undefined' || query == '' ){
    Swal.fire({  
      title: "Fields are empty",
      text: "Please fill the fields",
      icon: "error",
      confirmButtonText: "OK", 
    }).then(() =>{
      setLoading(true)
    })
    return
  }
  let mails = email.split(",")
  let response = await axios.post(`http://localhost:8086/agentapp/sendMail/${mails}/${query}`,{

  },
  {
      headers:{
          Authorization: `Bearer ${token}`
      }
  })
  if(response.data){
    setLoading(true)
  }
 
  Swal.fire({  
      title: "Mail Sent Successfully",
      icon: "success",
      confirmButtonText: "OK", 
    });  
return
}



  return ( 
    <>
    {loading?
    <>
      <div className='background'>
    <NavBar role={role} username={username}/>
    <div>
      <h1 className="formheading">Send Mail</h1>
      <form className='queryForm'>
        <div className="form-group">
          {/* <label>Your Email</label> */}
          <input
            type="email"
            value={email}
            placeholder="Email*"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label>Your Query</label> */}
          <textarea
            value={query}
            placeholder="Your Message*"
            onChange={handleQueryChange}
            rows="6"
            required
          />
        </div>
       
      </form>
      <button className ="button" style={{marginLeft:'45%'}} onClick={() => handleSend()}>Send</button>
    </div>
    </div>
    </>:<><NavBar role={role} username={username}/><Spinner/></>}
  
  </>
  )
}

export default Marketing