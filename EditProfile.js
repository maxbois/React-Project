
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';



function EditUser() {
  let navigate = useNavigate()
  let params = useParams()
  let [username,setUsername] = useState("")
  
  let [email,setEmail] = useState("")
  let [password,setPassword]=useState("")
  let [mobile,setMobile] = useState("")


  let handleSubmit = async()=>{
    let data = {
        username,
        email,
        password,
        mobile
        
    }
    if(params.id)
    {
        try {
            let res = await axios.put(`https://64e998f4bf99bdcc8e66d163.mockapi.io/users/${params.id}`,data)
            if(res.status===200)
            {
                navigate('/dashboard')
                alert("Data Edited Successfully");
            }
        } catch (error) {
            console.log(error)
        }
    }
    else
    {
        try {
            let res = await axios.post('https://64e998f4bf99bdcc8e66d163.mockapi.io/users',data)
            if(res.status===201)
            {
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }
  }

  let getData = async ()=>{
    try {
        let res = await axios.get(`https://64e998f4bf99bdcc8e66d163.mockapi.io/users/${params.id}`)
        if(res.status===200)
        {
            setUsername(res.data.username)
            
            setEmail(res.data.email)
            setPassword(res.data.password)
            setMobile(res.data.mobile)
            
        }
        else
        {
            navigate('/dashboard')
        }
    } catch (error) {
        navigate('/dashboard')
    }
  }

  useEffect(()=>{
    if(params.id)
    {
        getData()
    }
  },[])

  return <div className='container-fluid'>
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} placeholder="Enter Name"  onChange={(e)=>setUsername(e.target.value)} required />
      </Form.Group>
    
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} placeholder="Enter email"  onChange={(e)=>setPassword(e.target.value)} required />
      </Form.Group>
      {/* <Form.Group className="mb-3" >
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" value={mobile} placeholder="Enter Mobile"  onChange={(e)=>setMobile(e.target.value)} required maxLength={10} />
      </Form.Group> */}
     
      <Button variant="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
    </Form>
    </div>
}

export default EditUser;