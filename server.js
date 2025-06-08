const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let notes = [];
let idCounter = 1;

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('Notes App Backend Running on Render');
});

// GET /notes: Retrieve all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// POST /notes: Create a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const newNote = { id: idCounter++, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT /notes/:id: Update a note by ID
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = notes.find(note => note.id === parseInt(id));
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  if (title) note.title = title;
  if (content) note.content = content;
  res.json(note);
});

// DELETE /notes/:id: Delete a note by ID
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === parseInt(id));
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  notes.splice(noteIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});