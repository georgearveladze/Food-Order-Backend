import { Request ,Response ,NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";

export const CreateVandor =async (req :Request , res:Response ,next:NextFunction) => {
    const {name, address ,pincode,foodType,email,password,ownerName,phone}= <CreateVandorInput>req.body
    try{

    const CreateVandor = await  Vandor.create({
        name:name,
        address:address,
        pincode:pincode,
        foodType:foodType,
        email:email,
        password:password,
        salt:"dsdsfsdfdsfdsf",
        ownerName:ownerName,
        phone:phone,
        rating:0 ,
        serviceAvalible:false,
        // coverImages:[]
    })
    return res.json(CreateVandor)
    }catch(err){
        console.log(err);
        
    }

}

export const GetVandors =async (req :Request , res:Response ,next:NextFunction) => {
    
}


export const GetVandorById =async (req :Request , res:Response ,next:NextFunction) => {
    
}