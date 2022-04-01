import * as yup from "yup";
import { Request, Response, NextFunction } from 'express';


export const validateSMS = (req:Request,res:Response,next:NextFunction)=>{
    let schema = yup.object().shape({
        from: yup.string().min(6).max(16).required("from is missing"),
        to: yup.string().min(6).max(16).required("to is missing"),
        text: yup.string().min(1).max(120).required("text is missing"),
    })  

    schema.validate(req.body).then(response=>{
        next();
    }).catch((error)=>{
        let message = error.message
        if (error.type=="min" || error.type=="max" ||error.type=="typeError"){
            message = `${error.path} is invalid`
        }
        return res.status(412).json({
            message:message,
            error:""
        })
    })
}
