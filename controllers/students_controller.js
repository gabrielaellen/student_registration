const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

const indexView = (req, res) => {
    Student.findAll()
      .then(data => {
        res.render("index", { students: data });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      });
};

const createView = (req, res) => { 
    console.log(req.body)
    const student = {
        name: req.body.name,
        test_grade_one: req.body.test_grade_one,
        test_grade_two: req.body.test_grade_two
    };

    Student.create(student)
        .then(data => {
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        });
};

module.exports = {
    indexView,
    createView,
};