import mongoose from "mongoose";
import { Schema } from "mongoose";

const newtoken = new Schema({

    access_token: String

});

export default mongoose.model("AwdizToken", newtoken);