import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'

function Admindash() {
    let [data,setData] = useState([])
    let navigate = useNavigate()
    let getData = async (id)=>{
        
        try {
            let res = await axios.get('https://64e998f4bf99bdcc8e66d163.mockapi.io/notes')
            if(res.status===200)
            {
                console.log(res.data)
                setData(res.data)
            }
        } catch (error) {
            console.log(error)   
        }
    }
   
    let handleDelete = async(id)=>{
        try {
            let res = await axios.delete(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${id}`)
            if(res.status===200)
            {
                getData()
            }
        } catch (error) { 
            console.log(error)   
        }
    }

    

    useEffect(()=>{
        getData()
        
    },[])
  return <>
     <div className='logout2'>
       <a href="./adsignin">Logout</a>
     </div>
     
    <div className='container-fluid'>
    <div className='row'>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Text</th>
          <th>Date</th>
          <th>Email</th>
          
          

        
        </tr>
      </thead>
      <tbody>
        {
            data.map((e)=>{
                return <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.text}</td>
                    <td>{e.date}</td>
                    <td>{e.email}</td>
                    
                   
                    
                    
                    <td>
                        
                        &nbsp;&nbsp;

                        <Button
                    variant='primary'
                    onClick={ ()=>navigate(`/adminedit/${e.id}`) } 
                >
                    <i className="fas fa-fw fa-pen"></i> Edit User
                    </Button>
                        
                        &nbsp;&nbsp;
                        <Button variant='danger' onClick={()=>handleDelete(e.id)}> <i className="fas fa-fw fa-trash"></i> Delete</Button>
                    </td>
                </tr>
            })
        }
      </tbody>
    </Table>
          </div>
  </div>

  </>
}

export default Admindash;
