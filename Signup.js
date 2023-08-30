
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import logo from "./logo.svg";

function SignUp() {
  let navigate = useNavigate();
  let params = useParams();

  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [mobile, setMobile] = useState('');
  // let [role, setRole] = useState('user');
  let [role, setRole] = useState('user'); 
  let [cpassword,setCpassword] = useState('');



  let handleSubmit = async () => {
    let data = {
      username,
      email,
      cpassword,
      password,
      mobile,
      role,
    };
    if (password !== cpassword) {
      alert('Password and Confirm Password do not match.');
      return; 
    }
    
    try {
      let existingUser = null;
      if (params.id) {
        
        const res = await axios.get(`https://64e998f4bf99bdcc8e66d163.mockapi.io/users/${params.id}`);
        existingUser = res.data;
      }
      
      else  {
        
        const res = await axios.get('https://64e998f4bf99bdcc8e66d163.mockapi.io/users');
        existingUser = res.data.find(user => user.email === email || user.mobile === mobile);
      }
      
      if (existingUser) {
        if (existingUser.email === email) {
          alert('Email already exists.');
        }
        if (existingUser.mobile === mobile) {
          alert('Mobile number already exists.');
        }
       
      } else {
       
        if (params.id) {
          try {
            let res = await axios.put(`https://64e998f4bf99bdcc8e66d163.mockapi.io/users/${params.id}`, data);
            if (res.status === 200) {
              
              navigate('/signin');
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            let res = await axios.post('https://64e998f4bf99bdcc8e66d163.mockapi.io/users', data);
            if (res.status === 201) {
              navigate('/signin');
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className='container-fluid'>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>User SignUp</h1>
      </header>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" value={username} placeholder="Enter Name" onChange={(e) => setUsername(e.target.value)} maxLength={20} required />
        </Form.Group>
        <Form.Group className="mb-3" >
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" value={email} placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)} required />
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" value={password} placeholder="Enter password"  onChange={(e)=>setPassword(e.target.value)} maxLength={20} required />
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label> Confrim Password</Form.Label>
      <Form.Control type="password" value={cpassword} placeholder="Confrim  password"  onChange={(e)=>setCpassword(e.target.value)} maxLength={20} required />
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label>Mobile</Form.Label>
      <Form.Control type="text" value={mobile} placeholder="Enter Mobile"  onChange={(e)=>setMobile(e.target.value)} maxLength={10} required />
    </Form.Group>
     
    {/* <Form.Group className="mb-3">
      {/* <Form.Label>Role</Form.Label> 
       <Form.Control
         as="select"
         value={role}
         onChange={(e) => setRole(e.target.value)}
         required
       >
         <option value="user">User</option>
         <option value="admin">Admin</option>
       </Form.Control>
    </Form.Group> */}

{/* <Form.Group className="mb-3"> */}
  {/* <Form.Label>Role</Form.Label> */}
  {/* <Form.Control
    as="select"
    value={role} 
    onChange={(e) => setRole(e.target.value)}
    required
  >
    <option value="user">User</option> 
    
  </Form.Control> */}
{/* </Form.Group> */}



        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        &nbsp;&nbsp;
        <a href='./signin'> Already Have An Account!! SignIn</a>
      </Form>
    </div>
  );
}

export default SignUp;




