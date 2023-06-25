import encrypt from "encryptjs";
import Users from "../model/register.js";

export const authForAddproduct = async (req,res,next) => {
    try{
        const {email,password,pin} = req.body;
        if(!email) return res.send("email is require in middleware");
        if(!password) return res.send("password is require in middleware");
        if(!pin) return res.send("pin is require in middleware");

        const response = await Users.find({email}).exec();
        if(!response.length) return res.send("user not found");
         
        let secretkey = 'vrushabh';
        const decipherForPassword = encrypt.decrypt(response[0].password, secretkey, 256);
        const decipherForPin = encrypt.decrypt(response[0].pin, secretkey, 256);

        if(decipherForPassword != password) return res.send("incorrect password");
        if(decipherForPin != pin) return res.send("incorrect pin");

        if(response[0].role == "admin" || response[0].role == "seller"){
            next();
            
        }else{
            return res.send("buyer is not allowed to add products");
        }
    }catch(err){
        return res.send(err);
    }
}

