import Users from "../model/register.js";
import encrypt from "encryptjs";


export const register = async (req,res) => {
    try{

        const {name,email,password,role,pin,number} = req.body;

        if(!name) return res.send("name is require");
        if(!email) return res.send("email is require");
        if(!password) return res.send("password is require");
        if(!role) return res.send("role is require");
        if(!pin) return res.send("pin is require");
        if(!number) return res.send("number is require");

        const response = await Users.find({email}).exec();
        if(response.length) return res.send("user already exist");

        let secretkey = 'vrushabh';
        let plaintextForPassword = password;
        let plaintextForPin = pin;

        const ciphertextForPassword = encrypt.encrypt(plaintextForPassword, secretkey, 256);
        const ciphertextForPin = encrypt.encrypt(plaintextForPin, secretkey, 256);

        const user = new Users({

            name: name,
            email: email,
            password: ciphertextForPassword,
            role: role,
            pin: ciphertextForPin,
            number: number
        });

        await user.save();

        return res.send("registration success");

    }catch(err){
        return res.send(err);
    }
}



export const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email) return res.send("email is require in middleware");
        if(!password) return res.send("password is require in middleware");

        const response = await Users.find({email}).exec();
        if(!response.length) return res.send("user not found");

        let secretkey = 'vrushabh';
        const decipherForPassword = encrypt.decrypt(response[0].password, secretkey, 256);

        if(decipherForPassword != password){
            return res.send("incorrect password")
        }else{
            return res.send("login successfull");
            
        }
    }catch(err){
        return res.send(err);
    }
}
