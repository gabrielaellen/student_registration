require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.set("view engine", "ejs")

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

