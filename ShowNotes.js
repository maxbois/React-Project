
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';
import Header from './Header';
import Search from './Search';
import { nanoid } from 'nanoid';
// import Note from './Note';
// import AddNote from './AddNote';

const ShowNotes = () => {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const { email } = useParams(); 

    useEffect(() => {
        fetchNotesFromAPI(email); 
    }, [email]);

    const fetchNotesFromAPI = async (userEmail) => {
        try {
            const response = await fetch(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes?email=${userEmail}`);
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes from API:', error);
        }
    };

    const addNote = async (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString(),
            email: email, 
        };

        try {
            const response = await fetch('https://64e998f4bf99bdcc8e66d163.mockapi.io/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });

            if (response.ok) {
                fetchNotesFromAPI(email);
            } else {
                console.error('Failed to add note to API');
            }
        } catch (error) {
            console.error('Error adding note to API:', error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchNotesFromAPI(email);
            } else {
                console.error('Failed to delete note from API');
            }
        } catch (error) {
            console.error('Error deleting note from API:', error);
        }
    };

    return (
        <div className={`${darkMode && 'dark-mode'}`}>
            <div className='container-fluid'>
                <Header handleToggleDarkMode={setDarkMode} />
                <Search handleSearchNote={setSearchText} />
                <div className='notes-list'>
                    {notes.map((note) => (
                        <Note
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            date={note.date}
                            handleDeleteNote={() => deleteNote(note.id)}
                        />
                    ))}
                    <AddNote handleAddNote={addNote} />
                </div>
            </div>
        </div>
    );
};

export default ShowNotes;
