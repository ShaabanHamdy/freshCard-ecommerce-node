import { Router } from "express";
import * as userController from "./user.controller.js";
import { asyncHandling } from "../../utils/error_handling.js";
const router = Router()




router.post("/signup", asyncHandling(userController.signUp))
// =============================================================
router.post("/login", asyncHandling(userController.login))
// =============================================================

router.get("/getAllUsers", asyncHandling(userController.getAllUsers))
// =============================================================

router.delete("/deleteUser/:_id", asyncHandling(userController.deleteOneUser))
// =============================================================


router.delete("/deleteAllUsers", asyncHandling(userController.deleteAllUsers))







export default router