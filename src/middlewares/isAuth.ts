import { Request, Response, NextFunction } from 'express';
import Account from '../models/account.models';
import {currentUser} from "../interfaces/interface"

const isAuth = async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(" ")[0] === "Basic") {
        const encodedCredentials:string = authHeader.split(" ")[1];
        try {
            //Decode credentials
            let bufferObj = Buffer.from(encodedCredentials,"base64")
            const credentials = bufferObj.toString("utf8").split(":")         
            let username=credentials[0], password=credentials[1]

            //Check Database for credentials
            const accounts_json = await Account.findAll({
                where:{username:username,auth_id:password}
            });
            const accountObj = JSON.parse(JSON.stringify(accounts_json,null,2));

            if (accountObj.length<1){
                return res.status(403).json({
                    error: "authentication failed",
                    message: "",
                });   
            }

            const user:currentUser = {
                id:accountObj[0].id,
                username: accountObj[0].username
            }
            req.body.currentUser = user;
            next();
        } catch (error) {
            return res.status(403).json({
                error: "authentication failed",
                message: "",
            });
        }
    } else {
        return res.status(403).json({
            error: "authentication failed",
            message: "",
        });
    }
};

export default isAuth;
