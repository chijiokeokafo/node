//3rd party
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
//mine
const notes = require('./notes.js');

const argv = yargs
	.command('add', 'Add a new note', {
		title: {
			describe: 'Title of Note',
			demand: true, 
			alias: 't'
		},
		body: {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		}
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: {
			describe: 'Title of Note',
			demand: true, 
			alias: 't'
		}
	})	
	.help()
	.argv;
var command = argv._[0];

if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log ('Success, note added!');
		notes.logNote(note);
	} else {
		console.log('Note title taken');
	}

} else if (command === 'list') {

	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} notes(s).`)
	allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {

	var note = notes.getNote(argv.title);
	if(note) {
		console.log('Requested note:');
		notes.logNote(note);
	} else {
		console.log('Note not found');
	};

} else if (command === 'remove') {

	var noteRemoved = notes.deleteNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	console.log(message);

} else {

	console.log('Command not found');

}