import mongoose from "mongoose";
import { Schema } from "mongoose";

const newuProduct = new Schema({

   title: String,
   price: String,
   category: String,
   description: String,
   image: String
});

export default mongoose.model("Products", newuProduct);