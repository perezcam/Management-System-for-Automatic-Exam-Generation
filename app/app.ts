import {sequelize} from "./database/database";
import { createDatabaseIfNotExists } from "./database/database";
import { connect } from "./database/database";
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
