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
                message: err.message || "Some error occurred while retrieving students."
            });
        });
};

const createView = (req, res) => {
  
    const testGradeOne = parseFloat(req.body.test_grade_one);
    const testGradeTwo = parseFloat(req.body.test_grade_two);

    if (isNaN(testGradeOne) || isNaN(testGradeTwo)) {
        return res.status(400).send({ message: "Invalid test grades provided." });
    }

    if ((testGradeOne || testGradeTwo) < 0  || (testGradeOne || testGradeTwo) > 10) {
      return res.status(400).send({ message: "Test grades must be between 0 and 10." });
  }

    let situation;
    const media = (testGradeOne + testGradeTwo) / 2;

    if (media >= 7) {
        situation = "aprovado";
    } else if (media >= 4) {
        situation = "recuperacao";
    } else {
        situation = "reprovado";
    }

    const student = {
        id: req.body.id,
        name: req.body.name,
        test_grade_one: testGradeOne,
        test_grade_two: testGradeTwo,
        average_test_grade: media.toFixed(2),
        situation,
    };

    Student.create(student)
        .then(data => {
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Student."
            });
        });
};

module.exports = {
    indexView,
    createView,
};
