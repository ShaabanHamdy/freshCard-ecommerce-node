import express from 'express'
import AppInit from './src/utils/AppInit.js'
import { config } from "dotenv"
config({path:"./config/secret.env"})
const app = express()
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

AppInit(app, express)

