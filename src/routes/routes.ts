import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
//validators
import {validateSMS} from "../validators/validators"
//controllers
import {InboundSMS,OutboundSMS} from '../controllers/controllers';
//middleware
import isAuth from "../middlewares/isAuth"

router.post('/inbound/sms', isAuth, validateSMS, async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const sms = await InboundSMS(req.body)
        return res.status(sms.code).json(sms.data)
    }catch(e){
        next();
        return res.status(500).json({
            message:"",
            error:"unknown failure"
        })
    }   
});

router.post('/outbound/sms', isAuth, validateSMS, async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const sms = await OutboundSMS(req.body)
        return res.status(sms.code).json(sms.data)
    }catch(e){
        next();
        return res.status(500).json({
            message:"",
            error:"unknown failure"
        })
    }   
});

export = router;