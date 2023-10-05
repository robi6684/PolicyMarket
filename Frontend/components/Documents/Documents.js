import React from 'react'
import { useNavigate, useParams } from 'react-router'
import NavBar from '../sharedComponents/NavBar'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'

const Documents = () => {
  const username = useParams().username 
  const customerid = useParams().customerid
  const token = localStorage.getItem("auth")
  const role = localStorage.getItem("role")
  const navigation = useNavigate()
  const [status,setStatus] = useState('Pending')

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const [doc,setDocument] = useState(null)
  const [index,setIndex] = useState(null)

  const authenticate = () =>{
    if(localStorage.getItem("name") !== username)
    navigation('/')
  }
  useEffect(() =>{
    authenticate()
  },[])

  const check = async () =>{
    if(role == "ROLE_CUSTOMER"){
    let response = await axios.get(`http://localhost:8086/customerapp/getId/${username}`,{
      headers : {
        Authorization:`Bearer ${token}`
      }
    })
    console.log(customerid)
    console.log(response.data)
    
    if(response.data != customerid)
    navigation('/')
    }
  }
  useEffect(() =>{
    check()
  })



  const getDocumentStatus = async () =>{
    try {
      let response = await axios.get(`http://localhost:8086/customerapp/getDocumentStatus/${customerid}`,{
        headers : {
          Authorization:`Bearer ${token}`
        }
      })
  
      if(response.data == 'Verified')
      setStatus("Verified")
    } catch (error) {
      navigation('/')
    }
  
  }

  useEffect(() =>{
    getDocumentStatus()
  },[])

  const updateStatus = async () =>{
    let response = await axios.put(`http://localhost:8086/customerapp/updateStatus/${customerid}`,{},{
      headers : {
        Authorization:`Bearer ${token}`
      }
    })
    Swal.fire({  
      title: "Document Approved Successfully",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(async function() {
      await getDocumentStatus()
    });  
  }

  const handleDownload = async (d) => {
    try {
      const response = await axios.get(`http://localhost:8086/fileapp/download/${customerid}/${d}`, {
        responseType: 'blob',// Set the response type to 'blob' for binary data
        headers: {
            Authorization: `Bearer ${token}`
          }
         
      });

      console.log(response.data)

      // Create a blob URL from the response data
      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      let filename
      if(d == 0){
        filename = "Aadhar.pdf"
      }
      if(d == 1){
        filename = "Pan.pdf"
      }
      if(d == 2){
        filename = "Voter.pdf"
      }
      
      link.download = filename; // Use the original file name
      link.click();

      // Clean up the blob URL after the download
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
}
const handleUpdate = (index) =>{
  setIndex(index)
  setShow1(true)
  setDocument(null)
}

const handleDocument = (event) =>{
  setDocument(event.target.files[0]);
}

const update = async() =>{
  if(document == null){
    Swal.fire({  
      title: "Document missing",
      text: "Please upload document",
      icon: "error",
      confirmButtonText: "OK", 
    });  
    return;
  }
  const form = new FormData()
  form.append('file', doc);

  try {
    const response = await fetch(`http://localhost:8086/fileapp/update/${username}/${index}`, {
      method: 'PUT',
      body: form,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    Swal.fire({  
      title: "Upload successful",
      icon: "success",
      confirmButtonText: "OK", 
    }).then(() =>{
      window.location.reload(false)
    });  
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}


  return (
    <div className='background'>
      <NavBar role={role} username={username}/>
      {role=="ROLE_CUSTOMER"?<></>:<><button class="button-arounder" onClick={() => navigation(-1)}>Go Back</button></>}
      <h1 className='heading'>Documents</h1>
      <div className='container'>
        <hr></hr>
    <table className="table">
    <thead>
      <tr>
        <th>Document Type</th>
        <th>Download</th>
        {role=="ROLE_CUSTOMER"?<th>Update</th>:<></>}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Aadhar Card</td>
        <td><Button  variant='success' onClick={() =>{handleDownload(0)}}>Download</Button></td>
        {role=="ROLE_CUSTOMER"?<td><Button variant='warning' onClick={()=>handleUpdate(0)}>Update</Button></td>:<></>}
      </tr>
      <tr>
        <td>Pan Card</td>
        <td><Button  variant='success' onClick={() =>{handleDownload(1)}}>Download</Button></td>
        {role=="ROLE_CUSTOMER"?<td><Button variant='warning' onClick={() => handleUpdate(1)}>Update</Button></td>:<></>}
      </tr>
      <tr>
        <td>Voter Card</td>
        <td><Button  variant='success' onClick={() =>{handleDownload(2)}}>Download</Button></td>
        {role=="ROLE_CUSTOMER"?<td><Button variant='warning' onClick={() => handleUpdate(2)}>Update</Button></td>:<></>}
      </tr>
    </tbody>
    </table>
    <hr></hr><br></br>
    <div>
    </div>
    <h4 style={{color:'#005bff'}}>Document Status : {status}</h4>
    {role=="ROLE_EMPLOYEE"?<>
    {status=="Verified"?<></>:<>
    <button className='button' onClick={updateStatus} style={{marginLeft:'40%'}}>Approve Status</button></>}
    </>:<></>}
    <Modal show={show1} onHide={handleClose1}  
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Are you sure want to update ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <lable><b>Upload different one</b></lable><br></br><br></br>
      <input type="file" onChange={handleDocument}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose1}>
          No
        </Button>
        <Button variant="primary" onClick={update}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
    </div>
  )
}

export default Documents
