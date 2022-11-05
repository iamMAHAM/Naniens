import { Request, Response, Router } from "express"
import Student from "../models/student.model"
import specialities from "../models/specialities.model"
const router = Router()

router.post('/add', async (req: Request, res: Response) => {
  try {
    let body = req.body
    const exists = await Student.findOne({
      email: body.email
    })
    if (exists) {
      await exists.delete()
    }
    const data = new Student(body)
    console.log('data', data)
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
  const retrieved = await Student.findOne({ email: email})
  res.status(200).json({
    message: retrieved?.toObject()
  })
})


router.get('/naniens', async (_: Request, res: Response) => {
  const naniens = await Student.find()
  res.json({
    status: true,
    data: [...naniens]
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


router.get('/specialities/:id', async (req: Request, res: Response) => {
  const data = await specialities.findOne({nom: req.params.id})
  console.log('fetching data for ', req.params.id, ' speciality')
  if (data){
    console.log(data)
    res.json({
      status: true,
      data: data?.toObject()
    })
  } else{
    res.json({
      status: false,
      message: 'pas trouvé'
    })
  }
})
export default router