import mongoose from "mongoose";


const connectdb= async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Db connected");
    
  }catch(error){
    console.log("DB not connected",error)
  }
}

export default connectdb 