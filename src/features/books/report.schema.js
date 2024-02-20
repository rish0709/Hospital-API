import mongoose from 'mongoose';

export const reportsSchema = new mongoose.Schema({
    patient:String,
    
    createdBy : String,
    status:String,
    date: Date

    
});