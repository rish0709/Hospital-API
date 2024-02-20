import mongoose from 'mongoose';


export const employeeSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    pendingReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }]


    
});