import userModel from "../../db/models/users/user.model.js"
import { token_decode } from "./token_genration.js"
import { asyncHandling } from './error_handling.js';





const auth = () => {
    return asyncHandling(async (req, res, next) => {
        const { auth } = req.headers
        if (!auth) return next(new Error("You are not logged in. Please login to get access"))
        const decode = token_decode({ payload: auth })
        const user = await userModel.findById({ _id: decode.id }).select("name email")
        if (!user) return next(new Error("not register account"))
        req.user = user

        return next()
    })
}

export default auth