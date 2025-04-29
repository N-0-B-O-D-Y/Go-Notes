import '../CSS/NotesList.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
export default function NotesList({notes, deleteNote, editNote}) {
    if(notes.length ===0){
        return <p className='no-notes'>No notes to display, click the above button to add.</p>
    }
    return (
        <>
            <div className='notes-list'>
                {
                    notes.map((note)=>(
                        <div key={note.id} className='note-card'>
                            <h3>{note.title}</h3>
                            <p>{note.content}<br/>
                                <small className='date'>
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </small>
                            </p>
                            <div className='note-actions'>
                                <EditNoteIcon onClick={()=>editNote(note)} className='editIcon' color='info' fontSize='medium'/>
                                <DeleteForeverIcon onClick={()=>deleteNote(note.id)} className='deleteIcon' fontSize='medium'/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}