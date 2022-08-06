import  express from "express";
import { AdminRoute , VandorRoute } from "./routers";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";


const app = express ()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))
app.use("/admin",AdminRoute)
app.use("/vandor",VandorRoute)



// mongoose.connect(MONGO_URI,{
//     // useNewUrlParser:true,
//     // useUnifiedTopology:true
//     // useCreateIndex:true,
// }).then(result =>{
//     console.log("DB connected")
// }).catch(err => console.log("error"+err))

async function connect () {
    try{
        await (mongoose.connect(MONGO_URI))
     
            console.log("Connected to BD")
        }catch(error){
        console.error("connection faled")
    }
        
}

connect()


app.listen(8000,() =>{
    console.clear()
    console.log ("App is lisetning to the port 8000")
}  ) 