import React, { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import './Login.css'
import Swal from 'sweetalert2'
import { login } from '../../services/LoginApi'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Login = () => {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [checkbox,setCheckbox] = useState(false)
    const [showPassword,setShowPassword] = useState("password")
    const [passwordIcon, setPasswordIcon] = useState(<FontAwesomeIcon icon={faEye} size='1x' className='show-password-btn'  />)
    const navigation = useNavigate()

    const checkRole = useParams().role;
    const handleMySubmit = async (e) =>{
        e.preventDefault()
        console.log(username)
        if(typeof username === 'undefined' || username === '' || typeof password === 'undefined'
        || password === ''){
            Swal.fire({  
                title: "Fields are empty",
                text: "Please fill the fields",
                icon: "error",
                confirmButtonText: "OK", 
              });  
              return;
        }
        let response;
        try {
           response = await login(username,password)
        } catch (error) {
            Swal.fire({  
                title: "Invalid Login Credentials",
                text: "Please enter correct username and password",
                icon: "error",
                confirmButtonText: "OK", 
              }); 
              return;   
        }
      
        let token = response.data.accessToken
        let role = response.data.rolename
        let name = response.data.username
        localStorage.setItem("auth",token)
        localStorage.setItem("role",role)
        localStorage.setItem("name",name)

        if(checkRole === 'admin'){
            if(role !== "ROLE_ADMIN"){
                Swal.fire({  
                    title: "Invalid Login Credentials",
                    text: "Please enter correct username and password",
                    icon: "error",
                    confirmButtonText: "OK", 
                  }); 
                  return;   
            }
            navigation(`/adminDashBoard/${username}`)
            return
        }

        if(checkRole === 'customer'){
            if(role !== "ROLE_CUSTOMER"){
                Swal.fire({  
                    title: "Invalid Login Credentials",
                    text: "Please enter correct username and password",
                    icon: "error",
                    confirmButtonText: "OK", 
                  }); 
                  return;   
            }
            navigation(`/customerDashBoard/${username}`)
            return;
        }

        if(checkRole === 'agent'){
            if(role !== "ROLE_AGENT"){
                Swal.fire({  
                    title: "Invalid Login Credentials",
                    text: "Please enter correct username and password",
                    icon: "error",
                    confirmButtonText: "OK", 
                  }); 
                  return;   
            }
            navigation(`/agentDashBoard/${username}`)
            return;
        }

        if(checkRole === 'employee'){
            if(role !== "ROLE_EMPLOYEE"){
                Swal.fire({  
                    title: "Invalid Login Credentials",
                    text: "Please enter correct username and password",
                    icon: "error",
                    confirmButtonText: "OK", 
                  }); 
                  return;   
            }
            navigation(`/employeeDashBoard/${username}`)
            return;
        }


        

    }
    return (
        <>
        <div className='divStyle'>
        <form>
        <div className="mb-3">
            <label class="form-label">Username*</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            />
        </div>
        <div className="mb-3">
            <label  class="form-label">Password*</label>
            <input type={showPassword} class="form-control" id="exampleInputPassword1" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <span onClick={() =>{
                if(showPassword == "password"){
                    setShowPassword("text")
                    setPasswordIcon(<FontAwesomeIcon icon={faEyeSlash} size='1x' className='show-password-btn'  />)
                }
                else{
                    setShowPassword("password")
                    setPasswordIcon(<FontAwesomeIcon icon={faEye} size='1x' className='show-password-btn'  />)
                }
                }}>{passwordIcon}</span>
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"
            onClick={(e) =>setCheckbox()}
            checked={checkbox}
            />           
            <label class="form-check-label mx-1">Remember Me</label> 
        </div>

        <button type="submit" className='button' onClick={handleMySubmit}>Submit</button><br/>
        </form>
        </div>
        </>
      )
}

export default Login
