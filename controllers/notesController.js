const fs = require("fs");
const file = "./data/notes.json";

const readData = () => JSON.parse(fs.readFileSync(file));
const writeData = (data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

exports.getNotes = (req, res) => {
  res.json(readData());
};

exports.getNote = (req, res) => {
  const notes = readData();
  const note = notes.find(n => n.id == req.params.id);
  note ? res.json(note) : res.status(404).json({ message: "Note not found" });
};

exports.createNote = (req, res) => {
  const notes = readData();
  const newNote = { id: Date.now(), ...req.body };
  notes.push(newNote);
  writeData(notes);
  res.json(newNote);
};

exports.updateNote = (req, res) => {
  let notes = readData();
  const index = notes.findIndex(n => n.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Note not found" });

  notes[index] = { ...notes[index], ...req.body };
  writeData(notes);
  res.json(notes[index]);
};

exports.deleteNote = (req, res) => {
  let notes = readData();
  const filtered = notes.filter(n => n.id != req.params.id);
  writeData(filtered);
  res.json({ message: "Deleted successfully" });
};
