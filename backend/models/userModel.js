// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     default: "",
//   },
//   searchHistory: {
//     type: Array,
//     default: [],
//   },
//   isEmailVerified: { type: Boolean, default: false },
//   emailVerificationToken: String,
//   emailVerificationTokenExpire: Date,
//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
// });

// export const User = mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: Array,
    default: [],
  },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationTokenExpire: Date,
  resetPasswordToken: {
    type: String, 
    required: false, 
  },
  resetPasswordExpire: Date,
});

export const User = mongoose.model("User", userSchema);
