import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connect_db() {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`db connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
         process.exit(1);  // 1 code means exit with failure and 0 means success
    }
}