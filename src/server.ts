// import express, { Application, Request, Response } from "express";
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
// const app : Application = express()

let server: Server;

const PORT = 5000;

async function main() {
  try {
      await mongoose.connect('mongodb+srv://mongo_db:mongo_db@cluster0.shqkw.mongodb.net/library_ms?retryWrites=true&w=majority&appName=Cluster0');
      console.log("connected to mongo");
      
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main() 


