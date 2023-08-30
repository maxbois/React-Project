



import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

 

function TextEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isNewNote = location.state?.isNewNote || false;
    const userEmail = location.state?.userEmail || "";

   

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [note, setNote] = useState({
        text: "",
        date: "",
        email: "",
        id: "",
    });

    useEffect(() => {
        if (!isNewNote) {
            async function fetchNote() {
                try {
                    const response = await fetch(
                        `https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${id}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setNote(data);

                        const blocksFromHTML = convertFromHTML(data.text);
                        const contentState = ContentState.createFromBlockArray(
                            blocksFromHTML.contentBlocks,
                            blocksFromHTML.entityMap
                        );

                        const initialEditorState = EditorState.createWithContent(contentState);
                        setEditorState(initialEditorState);
                    } else {
                        console.error("Failed to fetch data");
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

            fetchNote();
        }
    }, [id, isNewNote]);

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleSubmit = async () => {
        try {
            const contentState = editorState.getCurrentContent();
            const contentText = contentState.getPlainText();
            const  dangerouslySetInnerHTML={ __html: draftToHtml(convertToRaw(contentState)) } ;
          //  const dangerouslySetInnerHTML={  draftToHtml(convertToRaw(contentState)) }
          //  const plainText =  htmlToDraft(dangerouslySetInnerHTML) 
            if (isNewNote) {
                const newNote = {
                    text: contentText,
                    date: new Date().toLocaleDateString(),
                    email: userEmail,
                };

                const response = await axios.post(
                    "https://64e998f4bf99bdcc8e66d163.mockapi.io/notes",
                    newNote
                );

                if (response.status === 201) {
                    console.log("New note added successfully");
                    navigate(-1);
                    setNote({
                        ...newNote,
                        id: response.data.id,
                    });
                } else {
                    console.error("Failed to add new note");
                }
            } else {
                const updatedNote = {
                    ...note,
                    text: dangerouslySetInnerHTML,
                };
                
                const response = await axios.put(
                    `https://64e998f4bf99bdcc8e66d163.mockapi.io/notes/${note.id}`,
                    updatedNote
                );

                if (response.status === 200) {
                    console.log("Note updated successfully");
                    navigate(-1);
                } else {
                    console.error("Failed to update note");
                }
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
            <button onClick={handleSubmit}>Submit</button>
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} ></div>
        </div>


 
    );
}

export default TextEditor;
