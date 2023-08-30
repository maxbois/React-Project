import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdSignIn() {
    let navigate = useNavigate();

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [role, setRole] = useState('admin'); 

    let handleSignIn = async () => {
        try {
            let res = await axios.get('https://64e998f4bf99bdcc8e66d163.mockapi.io/users', {
                params: {
                    email,
                },
            });

            if (res.data.length === 1) {
                if (res.data[0].password === password) {
                    if ((res.data[0].role === 'admin')) {
                        navigate('/adroute'); 
                    } 
                     else {
                        alert('Invalid user role.'); 
                    }
                } else {
                    alert('Password is incorrect.');
                }
            } else {
                alert('Email is incorrect.');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred while signing in.');
        }
    };

    return (
        <div className="container-fluid">
            <header className="App-header">
                <h1>Admin Login</h1>
            </header>
            <Form>
            <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

                <Button variant="primary" onClick={handleSignIn}>
                    Sign In
                </Button>
                &nbsp;&nbsp;
                
                <a href="./adsignup">Don't Have An Account? Sign Up</a>
            </Form>
        </div>
    );
}

export default AdSignIn;

