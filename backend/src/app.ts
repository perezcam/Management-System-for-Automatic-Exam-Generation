import express, { Application } from "express";

const app: Application = express();

app.get("/ping", (_req, res) => {
    res.json({"ok": true, "message": "pong"})
})


export default app