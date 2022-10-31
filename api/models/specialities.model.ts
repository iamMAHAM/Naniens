import { Schema, model } from "mongoose";

const specialiesSchema = new Schema({
  nom:{
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  etapes: {
    type: Object,
    required: true,
  }
})

export default model('Specialitie', specialiesSchema)