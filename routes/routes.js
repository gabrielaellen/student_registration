const studentsController = require("../controllers/students_controller.js");

const express = require('express');
const router = express.Router();


router.get("/", studentsController.indexView);

module.exports = router;