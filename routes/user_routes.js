import express from "express";
import { login, register } from "../controllers/user_controller.js";
import { createToken } from "../controllers/token_controller.js";
import { add_product, delete_product, getProduct } from "../controllers/product_controller.js";
import { authForAddproduct } from "../middlewares/authentication.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/createToken", createToken);
router.post("/add_product",authForAddproduct, add_product);
router.post("/getProduct", getProduct);
router.post("/delete_product", delete_product);




export default router;