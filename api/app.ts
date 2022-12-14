import express, { Express, Request, Response } from 'express'
import cors from 'cors';
import { config } from 'dotenv'
import connectDB from './config/db'
import apiRoute from './routes/route'
import path from 'path'
import { isProduction } from './config/config';
config()

const app: Express = express()
const PORT: number = Number(process.env.PORT) || 3000

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

app.use('/api', apiRoute)

if(isProduction){
  app.get('/',(req: Request, res: Response) => {
    res.sendFile(path.join('../dist/index.html'))
  })
  app.get('*/*',(req: Request, res: Response) => {
    res.sendFile(path.join('../dist/index.html'))
  })
}

connectDB()
.then(()=>{
  app.listen(PORT, ()=>{
    console.log("server connecté sur le port : ", PORT)
  })
})
.catch((e: Error) => {
  console.error(e)
})
