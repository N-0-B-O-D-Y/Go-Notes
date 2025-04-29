const STORAGE_KEY = 'notesAppData';
// get notes from localStorage
export function getNotes(){
    try{
        const data = localStorage.getItem(STORAGE_KEY);
        return data?JSON.parse(data):[];
    }
    catch(error){
        console.log("failed to load notes", error);
        return [];
    }
}

// save notes to localStorage
export function saveNotes(notes){
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        return true;
    }
    catch(error){
        console.log("failed to save notes", error);
        return false;
    }
}