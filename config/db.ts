import { connect } from "mongoose";
import { config } from "dotenv"

config()

const connectDB = async () => {
    if (!process.env.STRING_URI) throw new Error("need environnement variable STRING_URI")
    try{
        connect(process.env.STRING_URI, (r) => {
            console.log('mongo connected')
        })
    } catch(e) {
        console.error(e)
    }
}

export default connectDB