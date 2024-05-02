import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection = () => {

    mongoose.connect(process.env.MONGODB_URL);

    mongoose.connection.on('connected', () => {
        console.log('Database connected successfully');
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
    })

    mongoose.connection.on('error', (err) => {
        console.log('Error while connecting with the database ', err.message);
    })
}

export default Connection;