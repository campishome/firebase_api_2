import express from "express";

export const app = express();

app.get("/", (req, res) => {
  res.send("API firebase_upload");
});


module.exports = app