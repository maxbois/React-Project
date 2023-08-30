
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
    let navigate = useNavigate();

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [role,setRole] = useState('');
    

    let handleSignIn = async () => {
        try {
            let res = await axios.get('https://64e998f4bf99bdcc8e66d163.mockapi.io/users', {
                params: {
                    email,
                },
            });

            if (res.data.length === 1) {
                if (res.data[0].password === password && res.data[0].email === email && res.data[0].role === 'user') {
                    navigate('/noteslist', { state: { userEmail: email } }); 
                } 
                else if (res.data[0].email=== email && res.data[0].password === password && res.data[0].role === 'admin' ){
                    navigate('/adroute');
                }
                else {
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
                <h1>User SignIn</h1>
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
                <a href="./signup">Don't Have An Account? Sign Up</a>
                {/* &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                &nbsp;&nbsp;
                <h5 className='adh5'>Click Here To Enter The Admin Panel : &nbsp;&nbsp;
                (<h8>Users Not Allowed </h8>) </h5>
                
                <Button  onClick={()=>navigate('/adsignin')}>Admin Panel</Button> */}
            </Form>
        </div>
    );
}

export default SignIn;
