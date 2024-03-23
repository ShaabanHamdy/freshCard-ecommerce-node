import * as cartConnection from "./order.controller.js"
import { Router } from "express"
import auth from "../../utils/auth.js";
import * as validators from "./order.validation.js"
import { validationMiddle } from "../../utils/validation.middle.js";
import { asyncHandling } from "../../utils/error_handling.js";
const router = Router()



// ========================================================================
router.post("/createOrder", auth(),
    validationMiddle(validators.createOrderJoi),
    asyncHandling(cartConnection.createOrder))


export default router