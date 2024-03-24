import * as orderConnection from "./order.controller.js"
import { Router } from "express"
import auth from "../../utils/auth.js";
import { asyncHandling } from "../../utils/error_handling.js";
const router = Router()



// ========================================================================
router.post("/createOrder",auth(),asyncHandling(orderConnection.createOrder))

router.get("/getAll",asyncHandling(orderConnection.getAll))

export default router
