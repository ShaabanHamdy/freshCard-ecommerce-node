import ConnectionDB from "../../DB/ConnectionDB.js"
// import * as appRouters from "../modules/app.routes.js"
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";
const __dirName = path.dirname(fileURLToPath(import.meta.url))
// import  globalErrorHandling  from './error.handling.js';




const AppInit = (app, express) => {
    app.use(express.json({}))
    app.use(cors())
    ConnectionDB()
    // ===================================================================
    // app.use("/uploads/images", express.static(path.join(__dirName, "../uploads/images")))
    // app.use("/user", appRouters.userRouter)
    // app.use("/product", appRouters.productRouter)
    // app.use("/cart", appRouters.cartRouter)
    // app.use("/order", appRouters.orderRouter)
    // app.use("/category", appRouters.categoryRouter)
    app.get('/', (req, res) => res.send('Welcome to our World '))
    //============================================================ routing
    // app.use(globalErrorHandling)
}


export default AppInit