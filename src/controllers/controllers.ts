import { Request, Response, NextFunction } from 'express';

// inbound sms
export const InboundSMS = async (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(200).json({
            message: "inbound sms ok",
            error: ""
        });
    }catch(e){
        return res.status(200).json({
            message: "",
            error: "unknown failure"
        });
    }

};

// outbound sms
export const OutboundSMS = async (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(200).json({
            message: "outbound sms ok",
            error: ""
        });
    }catch(e){
        return res.status(200).json({
            message: "",
            error: "unknown failure"
        });
    }
};