import express, { Express, Request, Response } from 'express'
import { config } from 'dotenv'

config()

const app: Express = express()

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')


app.listen(process.env.PORT || 3000, ()=>{
    console.log("application connecté sur le port : ", process.env.PORT)
})