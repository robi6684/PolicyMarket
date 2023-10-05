import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'

const PremiumPay = () => {

    const role = localStorage.getItem("role")
    const username = useParams().username
    const policynumber = useParams().policynumber
    //const amount = useParams().amount
    const [amount,setAmount] = useState()
    const token = localStorage.getItem("auth")
    let tax = 4
    let totalamount = Math.ceil(Number(amount) + Number((amount*tax)/100))
    let currentDate = new Date().toJSON().slice(0, 10);

    const [paymentType, setPaymentType] = useState("Debit Card")
    const [cardnumber,setCardnumber] = useState()
    const navigation = useNavigate()

    const authenticate = () =>{
      if(localStorage.getItem("name") !== username)
      navigation('/')
    }
    useEffect(() =>{
      authenticate()
    },[])

    const getAmount = async () =>{
      try {
        let response = await axios.get(`http://localhost:8086/policyapp/getAmount/${policynumber}`,
        {
            headers : {
              Authorization : `Bearer ${token}`
            }  
          })
          setAmount(response.data)
      } catch (error) {
        
      }
      
    }
    useEffect(() =>{
      getAmount()
    },[])

    
  

    const handlePayment = async (e) =>{
        e.preventDefault()
        if(typeof cardnumber == 'undefined' || cardnumber == '')
        {
          Swal.fire({  
            title: "Fields are empty",
            text: "Please fill the fields",
            icon: "error",
            confirmButtonText: "OK", 
          });  
          return;
        }
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
        try {
        let response = await axios.post(`http://localhost:8086/paymentapp/save/${username}/${policynumber}`,{
        amount,
        tax,
        paymenttype:paymentType,
        totalpayment : totalamount
        },{
          headers : {
            Authorization : `Bearer ${token}`
          }  
        })
        Swal.fire({  
            title: "Payment done successfully",
            icon: "success",
            confirmButtonText: "OK", 
          }).then(function() {
            const obj = {
              "date" : currentDate,
              "premiumamount" : amount,
              "paymenttype" : paymentType,
              "cardnumber" : cardnumber,
              "tax" : tax,
              "totalamount" : totalamount
            }
            navigation(`/receipt/${username}/${policynumber}/` + encodeURIComponent(JSON.stringify(obj)))
            
          });  
        } catch (error) {
            console.log(error)
        }
       

    }
  return (
    <div className='background'>
      <NavBar role={role} username={username}/>
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
             value={amount} disabled
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
        <button style={{marginLeft:'45%'}} className='button' onClick={handlePayment}>Pay</button>
        
    </div>
  )
}

export default PremiumPay
