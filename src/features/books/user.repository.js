import mongoose from 'mongoose';
import { doctorsSchema } from './doctors.schema.js'
import { patientsSchema } from './patients.schema.js';
import { reportsSchema } from './report.schema.js';
import { ObjectId } from 'mongodb';

// creating model from schema.
const doctorsModel = mongoose.model('Doctor', doctorsSchema);

// creating model for review.
const patientsModel = mongoose.model('Patient', patientsSchema);
const reportsModel = mongoose.model('Report', reportsSchema);


export default class userRepository {

    async checkDoctorsCred(username, password){
        const doctor = await doctorsModel.findOne({username: username, password: password});
        return doctor;
    }

    async storeDoctorsDataIntoDB(username, password){
        const doctor = new doctorsModel({username: username, password: password});
        const result =  await doctor.save();
        console.log("result", result);
        return result;
        // return await employeeModel.find();

    }

    async storePatientsDataIntoDB(phone, name){
        const patient = await patientsModel.findOne({phone:phone});
        if (patient){
            return "patient already registered";
        }
        else{
            const pat = new patientsModel({phone: phone, name: name});
            return await pat.save();
        }
        
    }

    

    async storeReportsDataIntoDb(doctorId, id, status, date){
        // const patient = await patientsModel.findById(id);
        // console.log("mila", patient);
        const doctor = await doctorsModel.findById(doctorId);
        const report = new reportsModel({patient: id, createdBy: doctor.username, status:status, date:date});
        return await report.save();

    }
    async getAllReports(id){
        console.log("in get reports repo");
        const report = await reportsModel.find({patient: id});
        console.log(report);
        return report;
        

    }

    async fetchingReportsByStatus(status){
        const report = await reportsModel.find({status:status});
        return report;
    }

    async getEmployeeData(id){
        const employee = await employeeModel.findById(id);
        const employeeInfo = new adminModel();
        await employeeInfo.findOne({ name: 'Rakesh' }, (err, user) => {
            if (err) {
                console.error(err);
                return;
            }
        
            // Find the nested array where the first element is 1
            const nestedArray = user.feedbacks.find(arr => arr[0] === id);
        
            // Retrieve the value at the 2nd index of the nested array
            if (nestedArray) {
                const value = nestedArray[1];
                const value2 = nestedArray[2];
                console.log('Value:', value);
            } else {
                console.log('No matching nested array found');
            }

            return values;
        
            
        });

    }

    async updateEmployeeInDb(id, name, username, password){
        await employeeModel.findByIdAndUpdate(id, {name: name, username:username, password: password});
        return await employeeModel.find();
    }

    async getEmployeeFromDb(id){
        return await employeeModel.findById(id), await employeeModel.find;

    }

    async getEmployeeToAssign(id){
        return await employeeModel.findById(id);

    }

    async reviewAssigned(name){
        const employee = await employeeModel.findOne({name:name});
        employee.pendingReviews.push(new ObjectID(employee._id));
        return await employee.save();

    }

    async checkValidEmployeeCred(username, password){
        const employee = await employeeModel.findOne({username:username, password: password});
        return employee;
    }

    async storeFeedbackIntoDb(targetId,employeeId, feedback){
        const admin = await adminModel.findOne({name:"Rakesh"});
        admin.feedbacks.push([targetId, employeeId, feedback]);
        await admin.save();
        const employee = await employeeModel.findById(employeeId);
        employee.pendingReviews.pull(targetId);
        return await employee.save();



}


    async addHabit(habit){
        
        const addHabit = new habitModel({habit:habit});
        const habit1 = await addHabit.save();

        

        const allHabits = await habitModel.find();
        // console.log(allHabits);
        return allHabits;
        
    }

    async changeStatus(habitId, habit){
        console.log("in change status repo");
        const dayNumber = habit[habit.length - 1];
        if (dayNumber < 0){
            dayNumber = dayNumber + 7;
        }
        const currentStatus = habit.slice(0,habit.length - 1);
        
        const Habit = await habitModel.findById(habitId);
        Habit.status.set(dayNumber, currentStatus);
        
        
        const flag = await Habit.save();
        console.log("required data", flag);
        return flag;


    }

    async getHabitArray(){
        const allHabits = await habitModel.find();
        // console.log(allHabits);
        return allHabits;
    }

    async getSelectedHabitData(habitId){

        const flag = await habitModel.findById(habitId);
        // console.log(flag);
        return flag;
    }
}