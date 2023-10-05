import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import {  useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import axios from "axios"

const RegisterPolicy = () => {
    const username = useParams().username
    const token = localStorage.getItem("auth")
    const role = localStorage.getItem("role")
    const navigation = useNavigate()

    const [customerusername,setCustomerusername] = useState()
    const [planname,setPlanname] = useState()
    const [schemename,setSchemeName] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [size,setSize] = useState(5)
    const [size1,setSize1] = useState(5)
    const [size2,setSize2] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const[dataError, setDataError] = useState({})
    const[data,setData] = useState({})
    const[data1,setData1] = useState({})
    const[data2,setData2] = useState({})
  
    const handlePageChange = async (clickValue) => {
      if(clickValue == "prev" && currentPage != 1)
      setCurrentPage(currentPage - 1)
      if(clickValue == "next" && currentPage != totalPages)
      setCurrentPage(currentPage + 1)
    }

    const getCustomer = async () => {
        let response = await axios.get('http://localhost:8086/customerapp/getAllCustomers',
          {
            params: {
              pageno: currentPage-1,
              pagesize: size,
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        
         )
         setData(response.data.content)
         setCustomerusername(response.data.content[0].username)
         setSize(response.data.totalElements)
         return response
    }

    useEffect(() =>{
        getCustomer()
    },[size])

    const getPlan = async () => {
        let response = await axios.get('http://localhost:8086/customerapp/getAllCustomers',
          {
            params: {
              pageno: currentPage-1,
              pagesize: size1,
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        
         )
         setData1(response.data.content)
         setPlanname(response.data.content[0].planname)
         setSize1(response.data.totalElements)
         return response
    }

    useEffect(() =>{
        getPlan()
    },[size1])

    const getScheme = async () => {
        let response = await axios.get('http://localhost:8086/customerapp/getAllCustomers',
          {
            params: {
              pageno: currentPage-1,
              pagesize: size2,
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        
         )
         setData2(response.data.content)
         setSchemeName(response.data.content[0].schemename)
         setSize2(response.data.totalElements)
         return response
    }

    useEffect(() =>{
        getScheme()
    },[size2])

    let options
    if(data.length > 0){
        options = data.map((d) =>{
        return(
            <>
          <option value={d.username}>{d.username}</option>
            </>
        )
        }
        )
    }

    const handlePlans = (e) =>{
        e.preventDefault()
        navigation(`/plan/${username}`)
    }


  return (
    <div className='background'>
    <NavBar role = {role} username = {username}></NavBar>
    <Form.Label>Select Customer</Form.Label>
    <Form.Control
    as="select"
    value={customerusername}
    onChange={e => {
    setCustomerusername(e.target.value) }}
    >
    {options}
    </Form.Control> 
        <button className='button' onClick={handlePlans}>View Plans</button>
    </div>
    
  )
}

export default RegisterPolicy
