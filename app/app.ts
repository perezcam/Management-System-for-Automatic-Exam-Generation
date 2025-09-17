import {sequelize} from "./database/migrations/database";
import { createDatabaseIfNotExists } from "./database/migrations/database";
import { connect } from "./database/migrations/database";
import Question from "./domains/question-bank/models/Question";
import express from "express";

const PORT = 5000;

const start = async() => {
    createDatabaseIfNotExists();
    connect();
    await Question.sync({force : false})
}

start()
const app = express();
app.listen(PORT,()=>{console.log(`Server On Port ${PORT}`);})
