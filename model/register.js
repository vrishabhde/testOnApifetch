import mongoose from "mongoose";
import { Schema } from "mongoose";

const newuser = new Schema({

    name: String,
    email: String,
    password: String,
    role: String,
    pin: String,
    number: Number
});

export default mongoose.model("Users", newuser);