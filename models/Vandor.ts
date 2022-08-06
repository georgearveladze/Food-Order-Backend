import mongoose, {Schema , Document , Model} from "mongoose";

interface VandorDoc extends Document {
    name:string;
    ownerName:string;
    foodType:[string];
    pincode:string;
    address :string;
    phone:string;
    email:string;
    password:string;
    salt:string;
    serviceAvalible:string;
    // coverImages:[string];
    rating:string;
    // foods:any;
}


const VandorSchema= new Schema({
    name:{type :String,required :true},
    ownerName:{type :String,required :true},
    foodType:{type:String},
    pincode:{type :String,required :true},
    address :{type:String},
    phone:{type :String,required :true},
    email:{type :String,required :true},
    password:{type :String,required :true},
    salt:{type :String,required :true},
    serviceAvalible:{type:Boolean},
    // coverImages:{type:String},
    rating:{type:Number},
    // foods:[{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref:"food"
    // }]
},{
    timestamps:true
})


const Vandor = mongoose.model<VandorDoc>("vandor", VandorSchema)

export{Vandor}