const fs = require('fs');

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
 
var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title, 
		body
	};
	var duplicateNotes = notes.filter((note) => note.title === title);
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	} else {
		console.log('Duplicate note, try again');
	};
};

var getAll = () => {
	return fetchNotes();
};

var getNote = (title) => {
	var notes = fetchNotes();
	var showNote = notes.filter((note) => note.title === title);
	return showNote[0];
};

var deleteNote = (title) => {
	var goneNote = fetchNotes();
	var removeNotes = goneNote.filter((note) => note.title !== title);
	saveNotes(removeNotes);

	return goneNote.length !== removeNotes.length;
};

var logNote = (note) => {
	debugger;
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

module.exports = {
	addNote, 
	getAll, 
	getNote, 
	deleteNote, 
	logNote
};