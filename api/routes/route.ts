import { Request, Response, Router } from "express"
import Info from "../models/info.model"
const router = Router()

router.post('/add', async (req: Request, res: Response) => {
  try {
    let body = req.body
    const exists = await Info.findOne({
      email: body.email
    })
    if (exists) {
      await Info.updateOne(...body, ...body)
      res.status(200).json({
        status: true,
        message: body,
      })
      return
    }
    const data = new Info(body)
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

router.get('/retrieve/:email', async (req: Request, res: Response)=>{
  const email = req.params.email
  const retrieved = await Info.findOne({ email: email})
  res.status(200).json({
    message: retrieved?.toObject()
  })
})

export default router