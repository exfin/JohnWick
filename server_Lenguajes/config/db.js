import mongoose from "mongoose"
export const connectionDB = async() =>{
    await mongoose.connect(process.env.MONGO_LINK).then(()=>console.log("DB conectada"))
}