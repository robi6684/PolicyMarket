import React from 'react'
import './Receipt.css'
import { useNavigate, useParams } from 'react-router'
import axios from "axios"
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const Receipt = () => {
    const val = useParams().val
    const token = localStorage.getItem("auth")
    const role = localStorage.getItem("role")
    const username = useParams().username
    const [data,setData] = useState({})
    const value = useParams().object
    const object = JSON.parse(decodeURIComponent(value));
    const navigation = useNavigate()
    const authenticate = () =>{
        if(localStorage.getItem("name") !== username)
        navigation('/')
      }
      useEffect(() =>{
        authenticate()
      },[])
    
    const receiptDetails = async () =>{
        try {
            let response = await axios.get(`http://localhost:8086/policyapp/getReceipt/${val}`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            console.log(response)
            console.log(object)
            setData(response.data)
        } catch (error) {
            
        }
       
    }

    useEffect(() =>{
        receiptDetails()
    },[])
    let currentDate = new Date().toJSON().slice(0, 10);
  return (
    
    <div>
 <div class="container my-5 receipt">
 <div class="row">
         <div class="col-lg-12">
             <div class="cardi">
                 <div class="card-body">
                     <div class="invoice-title">
                         <h4 class="float-end font-size-15">Invoice<span class="badge bg-success font-size-12 ms-2">Paid</span></h4>
                         <div class="mb-4">
                            <h3 class="mb-1 text-muted">Policy Market</h3>
                         </div>
                         <div class="text-muted">
                             <p class="mb-1">Barora, Nawagarh, Dhanbad, Jharkhand, 828306</p>
                             <p class="mb-1"><i class="uil uil-envelope-alt me-1"></i>&#128231; policymarket@gmail.com</p>
                             <p><i class="uil uil-phone me-1"></i>&#128241; +91-9786765467</p>
                         </div>
                     </div>
 
                     <hr class="my-4"/>
 
                     <div class="row">
                         <div class="col-sm-6">
                             <div class="text-muted">
                                 <h5 class="font-size-16 mb-3">Billed To:</h5>
                                 <h5 class="font-size-15 mb-2">{data.firstname} {data.lastname}</h5>
                                 <p class="mb-1">{data.address}</p>
                                 <p class="mb-1">{data.email}</p>
                                 <p>{data.mobilenumber}</p>
                             </div>
                         </div>
                         
                         <div class="col-sm-6">
                             <div class="text-muted text-sm-end">
                                 <div>
                                     <h5 class="font-size-15 mb-1">Invoice No:</h5>
                                     <p>#DZ0112</p>
                                 </div>
                                 <div class="mt-4">
                                     <h5 class="font-size-15 mb-1">Invoice Date:</h5>
                                     <p>{currentDate}</p>
                                 </div>
                             </div>
                         </div>
                         
                     </div>
                    
                     
                     <div class="py-2">
                         <h5 class="font-size-15">Payment Details</h5>
 
                         <div class="table-responsive">
                             <table class="table align-middle table-nowrap table-centered mb-0">
                                 <thead>
                                     <tr>
                                         <th>Scheme Name</th>
                                         <th>Policy Number</th>
                                         <th>Amount</th>
                                         <th>Payment Type</th>
                                         <th>Card Number</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     <tr>
                                         <td>
                                            <h5 class="text-truncate font-size-14 mb-1">{data.schemename}</h5>  
                                         </td>
                                         <td>{data.policynumber}</td>
                                         <td>&#8377;{object.premiumamount}</td>
                                         <td >{object.paymenttype}</td>
                                         <td >{object.cardnumber}</td>
                                     </tr>
                                     
                                     <tr>
                                         <th scope="row" colspan="4" class="text-end">Sub Total :</th>
                                         <td class="text-end">&#8377;{object.premiumamount}</td>
                                     </tr>
                                     
            
                                     
                                     <tr>
                                         <th scope="row" colspan="4" class="border-0 text-end">
                                             Tax :</th>
                                         <td class="border-0 text-end">{object.tax}%</td>
                                     </tr>
                                     
                                     <tr>
                                         <th scope="row" colspan="4" class="border-0 text-end">Total :</th>
                                         <td class="border-0 text-end"><h4 class="m-0 fw-semibold">&#8377;{object.totalamount}</h4></td>
                                     </tr>
                                     
                                 </tbody>
                             </table>
                         </div>
                         <div class="d-print-none mt-4">
                             <div class="float-end">
                                 <a href="javascript:window.print()" class="btn btn-success me-1">Print</a>
                                 {role=="ROLE_AGENT"?<>
                                 <button className='btn btn-primary' onClick={() => navigation(`/agentDashBoard/${username}`)}>Go to Dashboard</button>
                                 </>:<>
                                 <button className='btn btn-primary' onClick={() => navigation(`/customerDashBoard/${username}`)}>Go to Dashboard</button>
                                 </>}
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>

    </div>
  )
}

export default Receipt
