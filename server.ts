// const express = require("express") // ES5
import express from "express"; //ES6
import mongoose from "mongoose";
import { Request, Response } from "express";
import dotenv from "dotenv";
import wilderRouter from "./routes/wilder";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3002;

const app = express();
mongoose
  .connect(`${process.env.MONGO_URI}`, {
    autoIndex: true,
  })
  .then(() => console.log("BD connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/wilder", wilderRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Cette route n'existe pas");
});

app.listen(PORT, () => console.log(`Serveur sur port ${PORT}`));
