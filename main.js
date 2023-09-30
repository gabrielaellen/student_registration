require('dotenv').config();
const express = require("express");
const session = require("express-session");

const app = express()
const PORT = process.env.PORT || 3000;

const db = require("./models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
    })
)

app.use((req, res, next) => {
    res.locals.message = req. session. message;
    delete req.session.message;
    next();
});

app.set('view engine', 'ejs');

app.use("", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

