
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useParams , useNavigate} from "react-router-dom";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor() {
  const { id } = useParams();
  const navigate= useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [note, setNote] = useState({
    text: "",
    date: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(
          `https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setNote(data);
          const contentState = convertFromRaw(JSON.parse(data.text));
          setEditorState(EditorState.createWithContent(contentState));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchNote();
  }, [id]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit = async () => {
    try {
      
      const contentPlainText = editorState.getCurrentContent().getPlainText();

      
      const newNote = {
        ...note,
        text: contentPlainText,
      };
      setNote(newNote);

      const response = await fetch(
        `https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${note.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        }
      );

      if (response.ok) {
        console.log("Note updated successfully");
        
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Note Information:</h2>
        <p>ID: {note.id}</p>
        <p>Date: {note.date}</p>
        <p>Email: {note.email}</p>
      </div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Editor Content:</h3>
        <pre>{note.text}</pre>
      </div>
    </div>
  );
}

export default TextEditor;
