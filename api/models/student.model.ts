import { model, Schema } from "mongoose";

const studentShema = new Schema({
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
    unique: true,
    match: /.+\@.+\..+/,
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
  profilUrl: {
    type: String,
    required: true
  },
  linkedinUrl: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String,
    required: false,
    default: 'https://github.com'
  },
  portfolioUrl: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
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
  likers: {
    type: [String],
    required: false,
    default: []
  },
  skills: {
    frontEnd: {
      type: Array,
      required: false,
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
  },
  isValidate: {
    type: Boolean,
    required: false,
    default: false
  }
}, {
  timestamps: true
})

export default model('Students', studentShema)