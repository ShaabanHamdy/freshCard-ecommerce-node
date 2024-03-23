import * as cartConnection from "./cart.controller.js"
import { Router } from "express"
import auth from "../../utils/auth.js";
import { asyncHandling } from "../../utils/error_handling.js";
const router = Router()





// ========================================================================
router.post("/addProductToCart", auth(),
    asyncHandling(cartConnection.addProductToCart))



router.get("/getAllCarts", auth(),
    asyncHandling(cartConnection.getAllCarts))
// ========================================================================




// ========================================================================
router.delete("/deleteAllCarts", asyncHandling(cartConnection.deleteAllCarts))



// ========================================================================
router.put("/removeOneCart", auth(), asyncHandling(cartConnection.removeOneCart))



// ========================================================================
router.post("/decrementCarts", auth(),
    asyncHandling(cartConnection.decrementCarts))

export default router