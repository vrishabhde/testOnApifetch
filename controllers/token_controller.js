import { CronJob } from "cron";
import AwdizToken from "../model/awdiztoken.js";
import uuid from 'uuidv4';




export const createToken = async (req, res) => {
    try {
        const access_token = uuid();

        const check = await AwdizToken.find({}).exec();

        if(check){

        }
        
        const token = new AwdizToken({
            access_token: access_token
        });



        let job = new CronJob ('*/1 * * * *',function()
        {
         AwdizToken.updateOne({}, { $unset: { access_token: 1 } })
         console.log("working");
        }
        )
        job.start();
        await token.save();
        return res.send("token generated");

    } catch (err) {
        return res.send(err);
    }
}


// export const get_token = async (req, res) => {
//     try {

//     } catch (err) {
//         return res.send(err);
//     }
// }



