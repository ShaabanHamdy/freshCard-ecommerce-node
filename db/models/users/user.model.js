import mongoose  from 'mongoose'; // Erase if already required
import bcrypt  from 'bcryptjs'; // Erase if already required

// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{
    timestamps:true
});
// hook to hash password 
userSchema.pre("save",function(next,doc){
    this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS)
    next()
})



//Export the model
const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel