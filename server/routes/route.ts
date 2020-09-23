import { Router, RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import db from "../config/mongodb.ts"
import type { InsertNote, Note } from "../model/NoteSchema.ts";

const router = new Router();

const coll = db.collection<Note>("note");

router.get("/", async (ctx: RouterContext) => {
    try {
        const notes = await coll.find();

        ctx.response.status = 201;
        ctx.response.body = notes;
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message }
    }
});

router.get("/:id", async (ctx: RouterContext) => {
    try {
        const { id } = ctx.params
        const notes = await coll.findOne({ _id: { $oid: id! } });

        ctx.response.status = 201;
        ctx.response.body = notes;
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message }
    }
});

router.post("/add-note", async (ctx: RouterContext) => {
    try {
        const body = await ctx.request.body();
        const { title,  description } = await body.value;

        if (!title || !description) {
            ctx.response.status = 201;
            ctx.response.body = {
                success: false,
                msg: "All field must be filled"
            }
            return;
        }

        const newNote: InsertNote = {
            title,
            description,
            date: new Date()
        };

        const res = await coll.insertOne(newNote);
        newNote._id = res;

        ctx.response.status = 201;
        ctx.response.body = newNote;
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message }
    }
})

router.delete("/:id", async (ctx: RouterContext) => {
    try {
        const { id } = ctx.params;
        await coll.deleteOne({ _id: { $oid: id! } });

        ctx.response.status = 201;
        ctx.response.body = `Note with id: ${id} has been deleted`
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message }
    }
})

router.patch("/update/:id", async (ctx: RouterContext) => {
    try {
        const { id } = ctx.params;
        const body = await ctx.request.body();
        const { title,  description } = await body.value;

        if (!title || !description) {
            ctx.response.status = 201;
            ctx.response.body = {
                success: false,
                msg: "All field must be filled"
            }
            return;
        }

        const { modifiedCount } = await coll.updateOne({ _id: { $oid: id! } }, {
            $set: {
                title,
                description
            }
        });

        ctx.response.status = 201;
        ctx.response.body = await coll.findOne({ _id: { $oid: id! } });
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { error: err.message }
    }
})

export default router