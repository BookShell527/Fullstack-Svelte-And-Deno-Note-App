<script>
	import Header from "./components/Header.svelte";
	import AddNote from "./components/AddNote.svelte";
	import axios from "axios";
	import Note from "./components/Note.svelte";

	let notes = [];

	const getNotes = async () => {
		const response = await axios.get("http://localhost:8000/");
		notes = response.data;
	};

	getNotes();

	const addNote = async e => {
		const data = e.detail;
		const res = await axios.post("http://localhost:8000/add-note", data)

		notes = [...notes, res.data];
	};

	const deleteNote = async e => {
		const data = e.detail;
		await axios.delete(`http://localhost:8000/${data}`)

		notes = notes.filter(m => m._id.$oid !== data)
	};

	const editNote = async e => {
		const data = e.detail;

		const editedNote = {
			title: data.title,
			description: data.description
		}

		const res = await axios.patch(`http://localhost:8000/update/${data.noteId}`, editedNote)

		window.location = "/";
	};
</script>


<div class="container">
	<Header />
	<AddNote on:addnote={addNote} />
	{ #if notes.length === 0 }
		<h4>You have no notes</h4>
	{ :else }
		{ #each notes as note }
			<Note title={note.title} description={note.description} noteId={note._id.$oid} on:deletenote={deleteNote} on:editnote={editNote} />
		{ /each }
	{ /if }
</div>

<style>
	.container {
		max-width: 800px;
		margin: auto;
		overflow: hidden;
		padding: 0 2rem;
	}
</style>