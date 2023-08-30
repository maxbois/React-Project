
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Note from "./Note";
import AddNote from "./AddNote";
import axios from "axios";
import { Button , Modal } from "react-bootstrap";
// import Modal from " @material-ui/core";
// import Modal from '@mui/material/Modal';



function NotesList() {
    const location = useLocation();
    const navigate = useNavigate();
    const userEmail = location.state?.userEmail || "DefaultUser";
    const username = useState();
    const [notes, setNotes] = useState([]);
    const [user,setUser] = useState([]);

    const [open, setOpen] = React.useState(false);
 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        fetchNotes(userEmail);
    }, [userEmail]);

    const fetchNotes = async (userEmail) => {
        try {
            let response = await axios.get(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes?email=${userEmail}`);
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const userdata = async ()=> {
        try {
            let response = await axios.get(`https://64e998f4bf99bdcc8e66d163.mockapi.io/users`);
           setUser (response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        userdata();
    }, []);
    
    const addNote = async (text) => {
        try {
            const date = new Date();
            const newNote = {
                text: text,
                date: date.toLocaleDateString(),
                email: userEmail,
            };

            let response = await axios.post(
                "https://64e998f4bf99bdcc8e66d163.mockapi.io/notes",
                newNote
            );
            setNotes([...notes, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${id}`);
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddUserNote = () => {
        navigate(`/texteditor/${userEmail}`, {
            state: {
                userEmail: userEmail,
                isNewNote: true, 
            },
        });
    };
    
    const editNote = (note) => {
        navigate("/texteditor", {
            state: {
                note,
            },
        });
    };
    return <>
        <div>
            <h3>Hi {username}</h3>
            <div className="logout">
                <a href="./signin">Logout</a>
            </div>
            
            
              
            <div className="notes-list">
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        date={note.date}
                        handleDeleteNote={deleteNote}
                        handleEditNote={() => editNote(note)}
                    />
                ))}
                {/* <AddNote handleAddNote={addNote} /> */}
                <Button   onClick={handleAddUserNote}>Add User Note</Button>
                
               
                               
         </div>
     </div>
               
                 {/* <div style={{ display: 'block', padding: 30 }}>
               
               <Button  className="logout" onClick={handleOpen}>
                        Profile
                </Button> 
               <Modal
                   onClose={handleClose}
                   open={open}
                   style={{
                       position: 'absolute',
                       border: '2px solid #000',
                       backgroundColor: 'gray',
                       boxShadow: '2px solid black',
                       height: 80,
                       width: 240,
                       margin: 'auto'
                   }}
               >
                   <h2>How are you?</h2>
               </Modal>
               </div>   */}
     <Button variant="primary" className="logout" onClick={handleShow}>
        Profile
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {user.map(() => (
                    <div
                        username={user.username}
                        email={user.email}
                        password={user.password}
                        mobile={user.mobile}
                       
                    />
                ))}     

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>               
               </>
               }
               
export default NotesList;
