import Redis from "ioredis";
import PhoneNumber from "../models/phone_number.models";
require('dotenv').config()

//interfaces
import {requestBody} from "../interfaces/interface"

//Instantiate Redis
const redis = new Redis(String(process.env.REDIS_URL));

// inbound sms
export const InboundSMS = async (data:requestBody) => {
    try{
        const phone_json = await PhoneNumber.findAll({
            where:{
                number:data.to,
                account_id:data.currentUser.id
            }
        });
        const phoneObj = JSON.parse(JSON.stringify(phone_json,null,2));
        
        //'to' field not found
        if (phoneObj.length<1){
            return {
                code:404,
                data:{
                    message: "",
                    error: "'to' parameter not found"
                }}
        }

        //Cache request if 'text' field contains STOP
        if (data.text=="STOP" || data.text=="STOP\n" || data.text=="STOP\r\n" || data.text=="STOP\r" ){
            // //generate cache_object_id
            // const unique_id = RandomString(6)
            await redis.set(data.from,data.to)
            await redis.expire(data.from, 4*60*60)
        }
        
        return {
            code:200,
            data:{
                message: "inbound sms ok",
                error: ""
            }}
    }catch(e){
        return {
            code:500,
            data:{
                message: "",
                error: "unknown failure"
        }}
    }
}

// outbound sms
export const OutboundSMS = async (data:requestBody) => {
    try{
        const redis_response = await redis.get(data.to)
        if (redis_response==data.from) {
            
            //cache blocked request 
            await redis.set(`redis_id:${data.from}`,data.from)
            //increment blocked request counter
            const requestCounter = await redis.incrby(`counter_id:${data.from}`,1)
            
            //set expiry to 24hrs
            await redis.expire(`counter_id:${data.from}`,24*60*60)
            if (requestCounter>50){
                await redis.del(`redis_id:${data.from}`)
                return {
                    code:400,
                    data:{
                        message: "",
                        error: `limit reached for from ${data.from}`
                    }
                }
            }
            
            return {
                code:400,
                data:{
                    message: "",
                    error: `sms from ${data.from} to ${data.to} blocked by STOP request`
                }
            }
        }
        
        const phone_json = await PhoneNumber.findAll({
            where:{
                number:data.from,
                account_id:data.currentUser.id
            }
        });
        
        const phoneObj = JSON.parse(JSON.stringify(phone_json,null,2));
        
        //'from' field not found
        if (phoneObj.length<1){
            return {
                code:404,
                data:{
                    message: "",
                    error: "'from,' parameter not found"
                }}
        }

        return {
            code:200,
            data:{
                message: "outbound sms ok",
                error: ""
            }}
    }catch(e){
        return {
            code:500,
            data:{
                message: "",
                error: "unknown failure"
        }}
    }
}