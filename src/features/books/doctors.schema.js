import mongoose from 'mongoose';

export const doctorsSchema = new mongoose.Schema({
    username: String,
    password: String

    
});