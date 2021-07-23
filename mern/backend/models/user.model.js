const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    rollno: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true },
    username: { type: String, required: true, minlength: 3 },
    contact: { type: String, required: true, minlength: 10, maxlength: 10 },
    vaccinename: { type: String },
    vaccine1: { type: Boolean, default: false },
    vaccine2: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
