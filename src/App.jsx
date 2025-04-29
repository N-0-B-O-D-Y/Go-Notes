import './App.css'
import AddNote from './Components/AddNote.jsx';
import NotesList from './Components/NotesList.jsx';
import {getNotes, saveNotes} from "./utils/storage.js";
import {useEffect, useState} from "react";

function App() {
    const [notes, setNotes] = useState([]);
    const [view, setView] = useState('list'); //'list' or 'add'
    const [error, setError] = useState(null);
    const [editNote, setEditNote] = useState(null);

    // delete Node
    const handleDeleteNote = (id) => {
        const updated = notes.filter((note) => note.id !== id);
        saveNotes(updated);
        setNotes(updated);
    };

    // edit note
    const handleEditNote = (note) => {
        setEditNote(note);
        setView('add');
    };

    useEffect(() => {
        const storedNotes = getNotes();
        setNotes(storedNotes);
    }, []);

    const handleAddNote = (note)=>{
        let updatedNotes;

        if(editNote){
            updatedNotes = notes.map((n)=>(n.id === editNote.id?{...note, id:editNote.id, createdAt: editNote.createdAt}:n));
        }
        else{
            updatedNotes = [{...note, id:Date.now(), createdAt: new Date().toISOString()}, ...notes];
        }

        const success = saveNotes(updatedNotes);
        if(success){
            setNotes(updatedNotes);
            setView('list');
            setError(null);
            setEditNote(null);
        }
        else{
            setError('Failed to save note.');
        }
    };
  return (
      <>
          <h1 className='h1-heading'>Note App</h1>
          <div className='app-container'>
              <nav className='app-nav'>
                  {view === 'list' ?<button onClick={()=>setView('add')}>Add Note</button>:<button onClick={()=>setView('list')}>View Notes</button>}
              </nav>
              {error && <p className='error-msg'>{error}</p>}
              {
                  view === 'add'?(
                      <AddNote onAdd={handleAddNote} editNote={editNote}/>
                  ):(<NotesList notes={notes} deleteNote={handleDeleteNote} editNote={handleEditNote} />)
              }
          </div>
      </>
  );
}

export default App
