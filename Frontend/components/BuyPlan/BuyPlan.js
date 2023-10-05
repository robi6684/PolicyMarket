import React from 'react'
import { useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import './BuyPlan.css'
import Swal from 'sweetalert2'

const BuyPlan = () => {
    const role = localStorage.getItem("role")
    const username = useParams().username
    const token = localStorage.getItem("auth")
    const data = useParams().object
    const object = JSON.parse(decodeURIComponent(data));
    const [paymentType, setPaymentType] = useState("Debit Card")
    const [cardnumber,setCardnumber] = useState()
    const [value,setValue] = useState({})
    const navigation = useNavigate()

    const authenticate = () =>{
      if(localStorage.getItem("name") !== username)
      navigation('/')
    }
    useEffect(() =>{
      authenticate()
    },[])
  
    

    let premiumtype = object.premiumtype
    let investmentyear = object.investmentYear
    let investmentAmount = object.investmentAmount
    let profitratio = object.profitratio
    let premiumamount
    let currentDate = new Date().toJSON().slice(0, 10);

    if(premiumtype == "Yearly"){
      premiumamount = Math.ceil(investmentAmount/investmentyear)
    }
    if(premiumtype == "Monthly"){
      premiumamount = Math.ceil(investmentAmount/(investmentyear*12)) 
    }
    if(premiumtype == "Quarterly"){
      premiumamount = Math.ceil(investmentAmount/(investmentyear*3))
    }

    let sumassured = Math.ceil(Number(investmentAmount) + Number(((profitratio/100)*investmentAmount)))
    let tax = 4
    let totalamount = Math.ceil(Number(premiumamount) + Number((premiumamount*tax)/100))

    
    const handlePayment = async (e) =>{
      e.preventDefault()
      const isValidCardNumber = /^[0-9]{16}$/.test(cardnumber);
      if(! isValidCardNumber){
        Swal.fire({  
          title: "Invalid Card Number",
          text: "Please enter correct 16-digit Card Number",
          icon: "error",
          confirmButtonText: "OK", 
        });  
        return;
      }
      console.log("Hello")
      let response
      if(role == "ROLE_CUSTOMER"){
      response = await axios.post(`http://localhost:8086/policyapp/save/${username}/${object.schemeid}/${investmentyear}/${paymentType}/${tax}/${totalamount}`,{
        premiumamount,
        premiumtype
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
    }

    else if(role == "ROLE_AGENT"){
      response = await axios.post(`http://localhost:8086/agentapp/registerPolicy/${object.name}/${username}/${object.schemeid}/${investmentyear}/${paymentType}/${tax}/${totalamount}`,{
        premiumamount,
        premiumtype
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log("HHHHH")
    }

      const obj = {
        "date" : currentDate,
        "premiumamount" : premiumamount,
        "paymenttype" : paymentType,
        "cardnumber" : cardnumber,
        "tax" : tax,
        "totalamount" : totalamount
      }
      const val = response.data
      Swal.fire({  
        title: "Payment successful",
        icon: "success",
        confirmButtonText: "OK", 
      }).then(() =>{
        navigation(`/receipt/${username}/${val}/` + encodeURIComponent(JSON.stringify(obj)))
      })


    }
   

    


  return (
    <div className='background'>
      <NavBar role={role} username={username}/>
      <h1 className='heading'>Confirm Details</h1>
      <div className='buyplan'>
        <form>
          <hr></hr>
        <div className="mb-3">
          <div className='row'>
            <div className='col-4'>
            <label class="form-label">Scheme Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={object.schemename} disabled
            />
            </div>
            <div className='col-4'>
            <label class="form-label">Investment Amount</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={object.investmentAmount} disabled
            />
            </div>
            <div className='col-4'>
            <label class="form-label">Investment Years</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={object.investmentYear} disabled
            />
            </div>
          
            </div>
        </div>
       
        <div className="mb-3">
          <div className='row'>
            <div className='col-4'>
            <label class="form-label">Premium Type</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={object.premiumtype} disabled
            />
            </div>
            <div className='col-4'>
            <label class="form-label">Profit Ratio</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={profitratio} disabled
            />
            </div>
            <div className='col-4'>
            <label class="form-label">Sum Assured</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={sumassured} disabled
            />
            </div>
          </div>
           
        </div>

        <hr></hr>
        </form>
        </div>
      <h1 className='heading'>Payment</h1>
      <div className='buyplan'>
        <form>
          <hr></hr>
        <div className="mb-3">
          <div className='row'>
            <div className='col-6'>
            <label class="form-label">Payment Type</label><br></br>
            <select onChange={(e) =>{setPaymentType(e.target.value)}}>
              <option value={"Debit Card"}>Debit Card</option>
              <option value={"Credit Card"}>Credit Card</option>
            </select>
            </div>
            <div className='col-6'>
            <label class="form-label">Card Number*</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
            onChange={(e) =>{setCardnumber(e.target.value)}}
            value={cardnumber}
            />
            </div>
            </div>
        </div>
       
        <div className="mb-3">
          <div className='row'>
            <div className='col-6'>
            <label class="form-label">Premium Amount</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={premiumamount} disabled
            />
            </div>
            <div className='col-6'>
            <label class="form-label">Tax</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={tax} disabled
            />
            </div>
          </div>
           
        </div>
        <div className="mb-3">
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8 totalAmount'>
            <label class="form-label">Total Amount</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
             value={totalamount} disabled
            />
            </div>
            <div className='col-2'></div>
          </div>
        </div>
      

        
        </form>
        </div>
        <button type="submit" style={{marginLeft:'45%'}} className='button' onClick={handlePayment}>Pay</button>
    </div>
  )
}

export default BuyPlan
