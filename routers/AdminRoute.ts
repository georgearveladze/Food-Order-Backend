import express, { Request,Response,NextFunction} from "express";
import { CreateVandor, GetVandorById, GetVandors } from "../controllers";


const router = express.Router()

router.get("/", (req:Request ,res:Response, next:NextFunction) =>{
  
    
    res.json({massage:"Hello from admin"})

})

router.post("/vandor",CreateVandor)
router.get("/vandors",GetVandors)
router.get("/vandor/:id",GetVandorById)


export {router as AdminRoute}