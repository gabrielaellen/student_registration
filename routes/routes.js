const studentsController = require("../controllers/students_controller.js");

const express = require('express');
const students = require("../models/students.js");
const router = express.Router();


router.get("/", studentsController.indexView);

router.post("/add", studentsController.createView);

router.get("/delete/:id", studentsController.deleteView);

module.exports = router;