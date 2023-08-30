import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

function AdRoute() {
    let navigate = useNavigate();

  return <>
      
     <div>
     <header className="App-adheader">
            <h1>Welcome To Admin Panel</h1>
      </header>      
          <h3 className='routeh3'>Enter To See The User Detail :</h3>
          <Button className='routebtn' onClick={()=>navigate('/dashboard')}>User Detail</Button>
     
     &nbsp;&nbsp;
     
    
             <h3 className='routeh3'>Enter To See The Notes Detail :</h3>
            <Button className='routebtn' onClick={()=>navigate('/admindash')}>Notes Detail</Button>
     
      &nbsp;&nbsp;

             <h3 className='routeh3'>Enter To Add Users :</h3>
            <Button className='routebtn' onClick={()=>navigate('/addusers')}>Add Users</Button>
     
     </div>
    
    
  
  </>
}

export default AdRoute