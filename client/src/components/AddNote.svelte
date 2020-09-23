<script>
    import { createEventDispatcher } from "svelte";

    let title;
    let description;

    const dispatch  = createEventDispatcher();

    const onSubmit = e => {
        e.preventDefault();

        const newNote = {
            title,
            description
        }

        dispatch("addnote", newNote);
    };
</script>

<form class="grid-3" on:submit={onSubmit}>
    <input type="text" placeholder="Title" bind:value={title} required />
    <input type="text" placeholder="Description" bind:value={description} required />
    <button type="submit" class="btn btn-primary">Add Notes</button>
</form>

<style>
    .grid-3 {
        text-align: center;
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

    button[type="submit"] {
        font: inherit;
    }
</style>