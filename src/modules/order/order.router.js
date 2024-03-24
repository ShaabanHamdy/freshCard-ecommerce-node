import * as orderConnection from "./order.controller.js"
import { Router } from "express"
import auth from "../../utils/auth.js";
import { asyncHandling } from "../../utils/error_handling.js";
const router = Router()



// ========================================================================
router.post("/order",auth(),asyncHandling(orderConnection.createOrder))

export default router