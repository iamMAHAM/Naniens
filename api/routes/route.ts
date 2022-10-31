import { Request, Response, Router } from "express"
import Info from "../models/info.model"
import specialities from "../models/specialities.model"
const router = Router()

router.post('/add', async (req: Request, res: Response) => {
  try {
    let body = req.body
    const exists = await Info.findOne({
      email: body.email
    })
    if (exists) {
      await exists.delete()
    }
    const data = new Info(body)
    await data.save()
    res.status(200).json({
      status: true,
      message: 'enregistré avec succès',
    })
  } catch (e: unknown){
    res.status(401).json({
      status: false,
      message: e instanceof Error ? e.message : e
    })
  }
})

router.get('/retrieve/:email', async (req: Request, res: Response)=>{
  const email = req.params.email
  const retrieved = await Info.findOne({ email: email})
  res.status(200).json({
    message: retrieved?.toObject()
  })
})


router.get('/specialities', async (_: Request, res: Response) => {
  const specialies  = await specialities.find()
  console.log(specialies)
  res.json({
    status: true,
    specialities: specialies
  })
})

export default router