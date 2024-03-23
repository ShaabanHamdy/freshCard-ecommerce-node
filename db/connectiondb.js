import mongoose from "mongoose";



const ConnectionDB =async ()=>{
        return await mongoose.connect(process.env.CONNECTION_DB)
        // return await mongoose.connect("mongodb+srv://cycle41:cycle41@cluster0.e09gpvw.mongodb.net/cycle41ECommerce")
        .then(res=>console.log("ConnectionDB is Running........"))
        .catch(err=>console.log({message:"fail in ConnectionDB" , err}))
}






export default ConnectionDB
