import { Request, Response, Router } from "express"
import Info from "../models/info.model"
const router = Router()

router.post('/add', async (req: Request, res: Response) => {
  try {
    const data = new Info(req.body)
    const exists = await Info.findOne({
      email: data.email
    })
    if (exists) throw new Error("informations déjà enregistrée")
    await data.save()
    res.status(200).json({
      status: true,
      message: data.toObject(),
    })
  } catch (e: unknown){
    res.status(401).json({
      status: false,
      message: e instanceof Error ? e.message : e
    })
  }
})

export default router