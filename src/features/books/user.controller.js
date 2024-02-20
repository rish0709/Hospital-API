import userRepository from "./user.repository.js";
import jwt from "jsonwebtoken";

export default class userController {
  constructor() {
    this.userRepository = new userRepository();
  }


  registerDoctors = async(req, res) => {
    const {username, password} = req.body;
    const result = await this.userRepository.storeDoctorsDataIntoDB(username, password);
    console.log("result11", result);
    if(result){
    // res.status(200).send(result, "succesfully registered doctor");
    res.json({"result":result, "text": "succesfully registered doctor" });
    }
    else{
      res.status(404).send("Error registering doctor");
    }

    
  }

  doctorLogin = async(req, res) => {
    // const admin =  await this.userRepository.getAdminLoginData();sssss
    const {username, password} = req.body;
    const status = await this.userRepository.checkDoctorsCred(username, password);
    console.log("status", status);
    if (status) {
      const token = jwt.sign(
        { userId: status._id, username: status.username},
        "CodingNinjas2016",
        { expiresIn: "1h" }
      );
      res
        .status(201)
        
        .json({ status: "success", msg: "login successfull", token });
    } else {
      res.status(400).json({ status: "failure", msg: "invalid user details" });
    }
  }

  registerPatient = async(req, res) => {
    
    const {phone, name} = req.body;
    const result = await this.userRepository.storePatientsDataIntoDB(phone, name);
    res.json({"result":result});
  }
  

  createReport = async(req, res) => {
    const doctorId = req.id;
    const {id} = req.params;
    console.log("id",id);
    const {status, date} = req.body;
    const result = await this.userRepository.storeReportsDataIntoDb(doctorId, id, status, date);
    res.json({"result" : result, "message": "report generated succesfully"});

  }

  allReports = async(req, res) => {
    console.log("in all reports controller");

    const {id} = req.params;
    const reportsList = await this.userRepository.getAllReports(id);

    if(reportsList){

    reportsList.forEach((report) => {
      res.json({createdBy:report.createdBy, status:report.status, date: report.date});


    })

  }
  else{
    res.send("error getting reports");
  }
}

fetchingReportsByStatus = async(req, res) => {

    const {status} = req.params;
    const reports = await this.userRepository.fetchingReportsByStatus(status);
    if (reports){
      res.send(reports);
    }
    else{
      res.send("error getting reports by status");
    }
    
    

    }

}
    
  


