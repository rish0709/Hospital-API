import express from "express";
const router = express.Router();
import usersController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.js";

const userController = new usersController();

// Create a New Book
router.post("/doctors/register", (req, res) => {
  // console.log("hey");
  userController.registerDoctors(req, res);
});

router.post("/doctors/login",(req, res) => {
  // console.log("hiii");
  
  userController.doctorLogin(req, res);
  // res.send("kya yr");
});

router.post("/patients/register", jwtAuth, (req, res) => {

  userController.registerPatient(req, res);
});

router.post("/patients/:id/create_report", jwtAuth, (req, res) => {
  // console.log("in change status route");
  userController.createReport(req, res);
});

router.get("/patients/:id/all_reports", jwtAuth, (req, res) => {
  console.log("in patient all reports route");
  userController.allReports(req, res);
});

router.get("/reports/:status", jwtAuth, (req, res) => {
  userController.fetchingReportsByStatus(req, res);
});








export default router;
