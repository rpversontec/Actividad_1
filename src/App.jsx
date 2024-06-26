import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = 'http://localhost:3001/api/notes'



const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get(baseUrl).then((response) => {
      setNotes(response.data);
    });
  }, []);

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      date: new Date().toISOString(),  // Formato ISO para compatibilidad con SQL
    };

    axios
      .post(baseUrl, noteObject)
      .then((response) => {
        console.log(response);
        setNotes(notes.concat(response.data))
        setNewNote("");
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.content}</li>
      ))}
    </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
