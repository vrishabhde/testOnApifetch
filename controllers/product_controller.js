import Products from "../model/product.js";
import Users from "../model/register.js";


export const add_product = async (req,res) => {
    try{
        const {email, title,price,category,description,image} = req.body;
        if(!title) return res.send("title is require");
        if(!price) return res.send("price is require");
        if(!category) return res.send("category is require");
        if(!description) return res.send("description is require");
        if(!image) return res.send("image is require");

        const response = await Users.find({email}).exec();
        if(!response.length) return res.send("user not found")
        if(response[0].role == "admin" || response[0].role == "seller"){
            const product = new Products({
                title,price,category,description,image
            });
            await product.save();
            return res.send("product added successfully");
        }else{
            return res.send("buyer is not allowed to add the products");
        }
    }catch(err){
        return res.send(err);
    }
} 



export const getProduct = async(req, res) => {
    try{
        const {email} = req.body;

        const response = await Users.find({email}).exec();
        if(!response.length) return res.send("user not found");

        if(response[0].role == "buyer" || response[0].role == "admin"){
            const check = await Products.find({}).exec();
            return res.send(check);
        }else{
            return res.send("you are not allow to get product");
        }

    }catch(err){
        return res.send(err);
    }
}


export const delete_product = async (req,res) => {
    try{
        const {email} = req.body;

        const response = await Users.find({email}).exec();

        if(!response.length) return res.send("user not found");

        if(response[0].role == "admin"){
            const delete_product = await Products.find({}).exec();

            // console.log(delete_product)
            return res.send("product deleted");

        }else{
            return res.send("you are not allowed to delete product");
        }
    }catch(err){
        return res.send(err);
    }
}