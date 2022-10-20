import { model, Schema } from "mongoose";

const infoSchema = new Schema({
  fullName: {
    type:  String,
    required: true
  },
  speciality: {
    type:  String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    default: 'M'
  },
  age: {
    type: Number,
    required: true
  },
  linkedinUrl: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String,
    required: false,
    default: 'https://google.com'
  },
  portfolioUrl: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  generation: {
    type: Number,
    required: true,
    default: 5.22
  },
  isBusy: {
    type: Boolean,
    required: true,
    default: false
  },
  skills: {
    frontEnd: {
      type: Array,
      required: true,
      default: ['HTML', 'CSS']
    },
    backEnd: {
      type: Array,
      required: false,
      default: []
    },
    databases: {
      type: Array,
      required: false,
    }
  }
}, {
  timestamps: true
})

export default model('Info', infoSchema)