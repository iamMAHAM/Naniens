import { Request, Response, Router } from "express"
import Student from "../models/student.model"
import specialities from "../models/specialities.model"
import { domains } from "../config/authorized"
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
  res.status(200).json({
    status: true,
    specialities: specialies
  })
})


router.get('/specialities/:id', async (req: Request, res: Response) => {
  const data = await specialities.findOne({nom: req.params.id})
  console.log('fetching data for ', req.params.id, ' speciality')
  if (data){
    console.log(data)
    res.status(200).json({
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


router.post('/naniens/like', async (req: Request, res: Response) => {
  const email: string = req.body.email
  const userEmail: string = req.body.userEmail
  let status = false
  let message = 'missing email'
  if (email && userEmail){
    const user = await Student.findOne({email: userEmail})
    if (!user){
      message = 'Student not found'
    }
    else if (user?.likers.includes(email)){
      message = 'already voted'
    }else{
      const splitted = email.split('@')
      const last = splitted[splitted.length - 1]
      if (domains.includes(last)){
        const likers = user?.toObject().likers
        likers?.push(email)
        console.log(likers)
        await user?.updateOne({likers: likers})
        await user?.save()
        status = true
        message = 'like success'
      }else{
        message = 'domaine d\'email non autorisé'
      }
    }
  }
  res.json({
    status: status,
    message: message
  })

})
export default router