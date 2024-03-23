import * as productConnection from "./product.controller.js"
import { Router } from "express"
import auth from "../../utils/auth.js";
import { asyncHandling } from "../../utils/error_handling.js";
import { myMulter } from "../../utils/multer.js";
const router = Router()










router.post("/createProduct", myMulter()
    .fields([{ name: "mainImage", maxCount: 1 }, { name: "subImages", maxCount: 5 }]),
    asyncHandling(productConnection.createProduct))

// ========================================================================


router.get("/getAllProducts", asyncHandling(productConnection.getAllProducts))
// ========================================================================
router.get("/getAllProductsUsers", auth(), asyncHandling(productConnection.getAllProductsUsers))

router.delete("/deleteAllProducts", asyncHandling(productConnection.deleteAllProducts))

// ========================================================================
router.delete("/deleteOneProducts", asyncHandling(productConnection.deleteOneProducts))

// ========================================================================
router.get("/getOneProduct/:productId",
    asyncHandling(productConnection.getOneProduct))









export default router