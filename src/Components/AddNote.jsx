import '../CSS/AddNote.css';
import {useEffect, useState} from "react";

export default function AddNote({onAdd, editNote}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if(editNote){
            setTitle(editNote.title);
            setContent(editNote.content);
        }
    }, [editNote]);

    const updateTitle=(event)=>{
        setTitle(event.target.value);
    }

    const updateContent = (event)=>{
        setContent(event.target.value);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(!title.trim() || !content.trim()){
            return;
        }
        const newNote = {
            id: editNote ? editNote.id : Date.now(),
            title,
            content,
            createdAt: editNote ? editNote.createdAt : new Date().toISOString(),
        };
        onAdd(newNote);
        setTitle("");
        setContent("");
    }


    return (
        <>
            <form className='add-note-form' onSubmit={handleSubmit}>
                <h2>{editNote?"edit Note":"New Note"}</h2>
                <input
                    className='note-title-box'
                    type="text"
                    placeholder="Note Title"
                    name="title"
                    value={title}
                    onChange={updateTitle}
                    required={true}
                />

                <textarea
                    className='note-content-box'
                    placeholder="Note Content" value={content} onChange={updateContent} required={true}/>

                {editNote===null?<button type='submit'>Add Note</button>:<button type='submit'>Update Note</button>}
            </form>
        </>
    );
}