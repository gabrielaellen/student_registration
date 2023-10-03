const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

const indexView = (req, res) => {
    var message = req.session.message;
    Student.findAll()
        .then(data => {
            res.render("index", { students: data, message: message });
            req.session.message = undefined;
            req.session.save(err => {
                if (err) {
                    throw err;
                };
            });
        })
        .catch(err => {
            req.session.message = "Ocorreu algum erro ao lista alunos.";
            res.redirect("/");
        });
};

const createView = (req, res) => {

    const testGradeOne = parseFloat(req.body.test_grade_one);
    const testGradeTwo = parseFloat(req.body.test_grade_two);

    if (isNaN(testGradeOne) || isNaN(testGradeTwo)) {
        return res.status(400).send({ message: "Notas Inválidas." });
    }

    if ((testGradeOne || testGradeTwo) < 0 || (testGradeOne || testGradeTwo) > 10) {
        return res.status(400).send({ message: "As notas dos testes devem estar entre 0 e 10." });
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
            req.session.message = "Aluno criado com sucesso!";
            res.redirect("/");
        })
        .catch(err => {
            req.session.message = "Ocorreu algum erro ao criar o Aluno.";
            res.redirect("/");
        });
};

const deleteView = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                req.session.message = "Aluno excluído com sucesso!";
                res.redirect("/");
            } else {
                req.session.message = `Não é possível excluir o aluno com id=${id}. Aluno não encontrado!`;
                res.redirect("/");
            }
        })
        .catch(err => {
            req.session.message = "Não foi possível excluir o aluno com id=" + id;
            res.redirect("/");
        });

}

module.exports = {
    indexView,
    createView,
    deleteView
};
