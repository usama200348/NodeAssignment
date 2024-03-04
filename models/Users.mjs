import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const {Schema}=mongoose


const userSchema = new Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minLength:8
    },
    fullname:{
        type:String,
        required:true,

    }
})


userSchema.pre("save", function (next) {
    const user = this
    //encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash
    next()
})

userSchema.methods.comparePassword = function (password) {
    const user = this
    //user.password === db password (encrypted) asjdhu2i346193
    //password === frontend password (normal) 123456
    console.log('db password', user.password)
    console.log('frontend password', password)

    return bcrypt.compareSync(password, user.password)
}


const Users = mongoose.model('users',userSchema)

export default Users