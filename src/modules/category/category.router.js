import { asyncHandling } from "../../utils/error_handling.js"
import * as productConnection from "./category.controller.js"
import { Router } from "express"
const router = Router()






router.post("/createCategory",
    asyncHandling(productConnection.createCategory))


// ========================================================================
router.get("/getAllCategories",
    asyncHandling(productConnection.getAllCategories))



// ========================================================================
router.delete("/deleteAllCategories",
    asyncHandling(productConnection.deleteAllCategories))



// ========================================================================
router.get("/getOneCategory/:categoryId",
    asyncHandling(productConnection.getOneCategory))










export default router