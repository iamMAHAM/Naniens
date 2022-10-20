import mongoose from "mongoose";
import { config } from "dotenv";

config()

const connectDB = async ()=>{
  return new Promise((resolve, reject)=>{
    if (!process.env.STRING_URI) throw new Error("env variable STRING_URI is required")
    mongoose.connect(process.env.STRING_URI)
    .then(r => {
      console.log('mongo connected')
      resolve(true)
    })
    .catch((e: Error) =>{
      reject(e.message)
    })
  })
}

export default connectDB