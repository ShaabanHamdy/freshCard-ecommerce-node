import * as appRouters from "../modules/app.routes.js"
import cors from 'cors'
import Connection_db from '../../db/connection_db.js';
import globalErrorHandling from "./error_handling.js";
// import { fileURLToPath } from "url";
// import path from "path";
// const __dirName = path.dirname(fileURLToPath(import.meta.url))






const AppInit = (app, express) => {
    // app.use(express.json({}))
    app.use((req,res,next)=>{
        if (req.originalUrl == "/order/webhook") {
            next()
        }else{
            express.json({})(req,res,next)
        }
    })
    app.use(cors())
    Connection_db()
    // ===================================================================
    // app.use("/uploads/images", express.static(path.join(__dirName, "../uploads/images")))
    app.use("/uploads", express.static("uploads"))
    app.use("/user", appRouters.userRouter)
    app.use("/product", appRouters.productRouter)
    app.use("/cart", appRouters.cartRouter)
    app.use("/order", appRouters.orderRouter)
    app.use("/category", appRouters.categoryRouter)
    app.get('/', (req, res) => res.send('Welcome to our World '))
    //============================================================ routing
    app.use(globalErrorHandling)
}


export default AppInit