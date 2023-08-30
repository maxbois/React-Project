import { MdDeleteForever } from 'react-icons/md';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const Note = ({ id, text, date, handleDeleteNote , userEmail  } ) => {
	let [email, setEmail] = useState('');
	let navigate = useNavigate();

    
	return <>
		<div className='note'>
			<span>{text}</span>
			
			<div className='note-footer'>
				<small>{date}</small>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
				<Button  onClick={()=>navigate(`/texteditor/${id}`)}>
                         Edit
                </Button>
               
			</div>
			
		</div>

		
			
	    
	</>
};

export default Note;