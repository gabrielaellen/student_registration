const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

const indexView = (req, res) => {
    res.render("index");
};
module.exports = {
    indexView,
};