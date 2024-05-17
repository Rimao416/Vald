const express = require("express");
const multer = require("multer");
const {
  registerStudent,

  getSingleTeacher,
  getStudents,
  getSingleStudent,
  updateStudent,
} = require("../../controllers/staff/studentController");
const authController = require("../../controllers/staff/authController");

const studentRouter = express.Router();

studentRouter.use(authController.protect);

// Actions requises pour le professeur

// Actions requises pour l'administrateur
studentRouter.use(authController.restrictTo("Admin"));

studentRouter.post("/register", registerStudent);
studentRouter.get("/", getStudents);
studentRouter.get("/:id", getSingleStudent);
studentRouter.put("/:id", updateStudent);

module.exports = studentRouter;
