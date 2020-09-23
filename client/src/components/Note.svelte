<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let title;
    export let description;
    export let noteId;

    let editMode = false;

    const deleteNote = () => dispatch("deletenote", noteId);
    const editNote = e => {
        e.preventDefault();
        const data = {
            title, 
            description,
            noteId
        }

        dispatch("editnote", data)
    };
    const changeEditMode = () => editMode = !editMode;
</script>

<div class="card">
	<h1>
        {title}
        <button class="btn btn-sm btn-danger" on:click={deleteNote}>Delete Note</button>
        <button class="btn btn-sm" on:click={changeEditMode}>Edit Note</button>
    </h1>
    <h3>{description}</h3>
    { #if editMode }
        <form on:submit={editNote}>
            <input type="text" placeholder="Title" bind:value={title} required />
            <input type="text" placeholder="Description" bind:value={description} required />
            <button type="submit" class="btn btn-primary">Edit Notes</button>
        </form>
    { /if }
</div>

<style>
    .card {
        padding: 1rem;
        border: #ccc 1px dotted;
        margin: 0.7rem 0;
    }
    .btn {
        display: inline-block;
        background: #f4f4f4;
        color: #333;
        padding: 0.4rem 1.3rem;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        margin-right: 0.5rem;
        transition: opacity 0.2s ease-in;
        outline: none;
    }
    .btn-sm {
        font-size: 0.8rem;
        padding: 0.3rem 1rem;
        margin-right: 0.2rem;
    }
    .btn-danger {
        background: #dc3545;
        color: #fff;
    }
    input {
        margin: 1.2rem 0;
    }

    input[type='text'] {
        display: block;
        width: 100% !important;
        padding: 0.4rem;
        font-size: inherit;
        border: 1px solid #ccc;
    }
</style>