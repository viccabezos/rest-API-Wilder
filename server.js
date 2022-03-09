// const express = require("express") // ES5
import express from "express"; //ES6
import mongoose from "mongoose";

import dotenv from "dotenv";
import wilderRouter from "./routes/wilder";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
mongoose
  .connect(`${process.env.MONGO_URI}`, {
    autoIndex: true,
  })
  .then(() => console.log("BD connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/wilder", wilderRouter);

app.use((req, res) => {
  res.status(404).send("Cette route n'existe pas");
});

app.listen(PORT, () => console.log(`Serveur sur port ${PORT}`));
