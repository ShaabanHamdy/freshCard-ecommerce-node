
import userModel from '../../../db/models/users/user.model.js';
import bcrypt from 'bcryptjs';
import { token_generation } from '../../utils/token_genration.js';

export const signUp = async (req, res, next) => {
    if (await userModel.findOne({ email: req.body.email })) return next(new Error("email already exist"))
    const user = new userModel(req.body)
    await user.save()
    if (!user) return next(new Error("fail to create user"))
    const token = token_generation({ payload: { user } })
    if (!token) return next(new Error("fail to generate token"))
    res.json({ message: "success", user })

}
//=====================================================  login



export const login = async (req, res, next) => {
    const checkEmail = await userModel.findOne({ email: req.body.email })
    if (!checkEmail) return next(new Error("invalid email information"))
    if (!bcrypt.compareSync(req.body.password, checkEmail.password)) return next(new Error("invalid password information"))
    const token = token_generation({ payload: { id: checkEmail._id } })

    res.json({ message: "success", token })

}
//=====================================================  get all users
export const getAllUsers = async (req, res, next) => {
    const users = await userModel.find()
    if (!users.length) return next(new Error("no users available"))
    res.json({ message: "all users", users })
}
//=====================================================  delete one user
export const deleteOneUser = async (req, res, next) => {
    const user = await userModel.findByIdAndDelete({_id:req.params._id})
    if (!user) return next(new Error("id invalid"))
    res.json({ message: "Deleted" })
}

//=====================================================  delete All Users
export const deleteAllUsers = async (req, res, next) => {
    const user = await userModel.deleteMany()
    if (!user) return next(new Error("fail in delete many"))
    res.json({ message: "Deleted All" })
}
