import Redis from "ioredis";
//interfaces
import {requestBody,controllerOutput} from "../interfaces/interface"

//Instantiate Redis
const redis = new Redis();

// inbound sms
export const InboundSMS = async (data:requestBody) => {
    try{
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