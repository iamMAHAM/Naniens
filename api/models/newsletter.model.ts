import { Schema, model } from "mongoose";

const newsletter = new Schema({
  email:{
    type: String,
    require: true,
    unique: true,
    match: /.+\@.+\..+/,
  }
})

export default model('Newsletter', newsletter)