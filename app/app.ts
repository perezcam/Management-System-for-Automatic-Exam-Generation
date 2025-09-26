import { errorHandler } from "./core/middlewares/errorHandler";
import { responseInterceptor } from "./core/middlewares/responseInterceptor";
import { createDatabaseIfNotExists } from "./database/database";
import { connect } from "./database/database";
import Question from "./domains/question-bank/models/Question";
import express, { Request, Response } from "express";


const PORT = 5000;

const start = async() => {
    createDatabaseIfNotExists();
    connect();
    await Question.sync({force : false})
}

start()
const app = express();
app.use(express.json())
app.use(responseInterceptor)

import { ValidationError } from "./shared/errors/domainErrors"; 
import { CreateUserRequestSchema, CreateUserResponseSchema } from "./ex";
import { validate_request } from "./core/middlewares/requestValidator";
import { validate_response } from "./core/middlewares/responseValidator";

app.get("/fail", (_req: Request, _res: Response) => {
    throw new ValidationError({
    message: "Esto es un error de validación de prueba",
    entity: "TestRoute",
});
});





app.post(
  "/users",
  validate_request(CreateUserRequestSchema),    // 👈 valida body de entrada
  validate_response(CreateUserResponseSchema),  // 👈 valida JSON de salida
  (req: Request, res: Response) => {
    const { email, name } = req.body;

    // Simulamos creación de usuario
    const newUser = { id: 1, email };

    // Si cambias este objeto a propósito (p.ej. omitir `name`),
    // saltará el response_validator
    res.json({
      message: "User created successfully",
      data: newUser,
    });
  }
);


app.get("/ping", (req : Request, res: Response) => {
    res.json({message: "pong"})
})

app.use(errorHandler)


app.listen(PORT,()=>{console.log(`Server On Port ${PORT}`);})