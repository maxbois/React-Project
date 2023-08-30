
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserNotes = () => {
    const { email } = useParams();
    const [userNotes, setUserNotes] = useState([]);
    const [editedNoteId, setEditedNoteId] = useState(null);
    const [editedNoteText, setEditedNoteText] = useState('');

    useEffect(() => {
        fetchUserNotes(email);
    }, [email]);

    const fetchUserNotes = async (userEmail) => {
        try {
            const response = await fetch(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes?email=${userEmail}`);
            const data = await response.json();
            setUserNotes(data);
        } catch (error) {
            console.error('Error fetching user notes:', error);
        }
    };

    const handleEditNote = (noteId, newText) => {
        setEditedNoteId(noteId);
        setEditedNoteText(newText);
    };

    const saveEditedNote = async (noteId) => {
        try {
            const updatedNote = {
                id: noteId,
                text: editedNoteText,
                email: email,
            };

            const response = await fetch(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNote),
            });

            if (response.ok) {
                setEditedNoteId(null);
                fetchUserNotes(email);
            } else {
                console.error('Failed to update note');
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const response = await fetch(`https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${noteId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchUserNotes(email);
            } else {
                console.error('Failed to delete note');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div>
            <h1>User Notes</h1>
            <ul>
                {userNotes.map((note) => (
                    <li key={note.id}>
                        {editedNoteId === note.id ? (
                            <textarea
                                value={editedNoteText}
                                onChange={(e) => setEditedNoteText(e.target.value)}
                            />
                        ) : (
                            <>
                                <p>Date: {note.date}</p>
                                <p>{note.text}</p>
                            </>
                        )}
                        {editedNoteId === note.id ? (
                            <button onClick={() => saveEditedNote(note.id)}>Save</button>
                        ) : (
                            <>
                                <button onClick={() => handleEditNote(note.id, note.text)}>Edit</button>
                                <button onClick={() => deleteNote(note.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserNotes;
