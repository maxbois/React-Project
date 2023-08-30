
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';



function EditUser() {
  let navigate = useNavigate()
  let params = useParams()
  let [text,setText] = useState("")
  
  let [email,setEmail] = useState("")
  let [date,setDate]=useState("")
 


  let handleSubmit = async()=>{
    let data = {
        text, 
        email, 
        date
        
    }
    if(params.id)
    {
        try {
            let res = await axios.put(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${params.id}`,data)
            if(res.status===200)
            {
                navigate('/noteslist')
                alert("Data Edited Successfully");
            }
        } catch (error) {
            console.log(error)
        }
    }
    else
    {
        try {
            let res = await axios.post('https://64e998f4bf99bdcc8e66d163.mockapi.io/notes',data)
            if(res.status===201)
            {
                navigate('/noteslist')
            }
        } catch (error) {
            console.log(error)
        }
    }
  }

  let getData = async ()=>{
    try {
        let res = await axios.get(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${params.id}`)
        if(res.status===200)
        {
            setText(res.data.text)
            
            setEmail(res.data.email)
            setDate(res.data.date)
           
            
        }
        else
        {
            navigate('/noteslist')
        }
    } catch (error) {
        navigate('/noteslist')
    }
  }

  useEffect(()=>{
    if(params.id)
    {
        getData()
    }
  },[])

}