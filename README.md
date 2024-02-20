To run this application on your local machine, please follow these steps:

Clone this repository:
https://github.com/rish0709/Hospital-API
Install the required dependencies using the following command:
npm install
Start the application using the following command:
npm start
Open the application in your postman app by visiting the following URL:
http://localhost:7000
Features:
There can be 2 types of Users:

Doctors

Patients

Doctors can log in
Each time a patient visits, the doctor will follow 2 steps:
Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)

After the checkup, create a Report

Patient Report will have the following fields:
Created by doctor

Status - Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]

Date

Routes:

/doctors/register → with username and password
/doctors/login → returns the JWT to be used
/patients/register
/patients/:id/create_report
/patients/:id/all_reports → List all the reports of a patient oldest to latest
/reports/:status → List all the reports of all the patients filtered by a specific status
