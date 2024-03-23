// import userModel from "../../DB/models/users/user.model.js"
// import { asyncHandling } from "./error.handling.js"
// import { tokenDecode } from "./tokenGenration.js"





// const auth = () => {
//     return asyncHandling(async (req, res, next) => {
//         const { auth } = req.headers
//         if (!auth) return next(new Error("You are not logged in. Please login to get access"))
//         const decode = tokenDecode({ payload: auth })
//         const user = await userModel.findById({ _id: decode.id }).select("name email")
//         if (!user) return next(new Error("not register account"))
//         req.user = user

//         return next()
//     })
// }

// export default auth