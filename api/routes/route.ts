import { Request, Response, Router } from "express"
import Students from "../models/student.model"
import specialities from "../models/specialities.model"
import { domains } from "../config/authorized"
import newsletters from "../models/newsletter.model"
const router = Router()

router.post('/add', async (req: Request, res: Response) => {
  try {
    let body = req.body
    const exists = await Students.findOne({
      email: body.email
    })
    if (exists) {
      await exists.delete()
    }
    const data = new Students(body)
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
  const retrieved = await Students.findOne({ email: email})
  res.status(200).json({
    message: retrieved?.toObject()
  })
})


router.get('/naniens', async (_: Request, res: Response) => {
  const naniens = await Students.find({isValidate: true})
  res.json({
    status: true,
    data: [...naniens]
  })
})

router.get('/naniens/waiting', async (_: Request, res: Response) => {
  const awaited = await Students.find({isValidate: false})
  res.status(200).json({
    status: true,
    data: [...awaited]
  })
})

router.post('/naniens/:type', async (req: Request, res: Response) => {
  const user = await Students.findOne({_id: req.body.id})
  const type = req.params.type
  if (!type || !user){
    res.status(400).json({
      status: false,
      message: 'Invalid request'
    })
    return
  }
  if (type === 'validate'){
    await user.updateOne({isValidate: true})
    await user.save()
  } else if (type === 'deny') await user.delete()
   else {
    res.status(404).json({
      status: false,
      message: 'unknow route'
    })
    return
  }
  
  res.status(200).json({
    status: true,
    message: 'Success'
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
    const user = await Students.findOne({email: userEmail})
    if (!user){
      message = 'Students not found'
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

router.post('/newsletter', async (req: Request, res: Response) => {
  newsletters.create({email: req.body.email})
  .then(doc => {
    console.log(doc)
    res.status(200).json({
      status: true,
      message: 'success'
    })
  })
  .catch((e: Error) => {
    res.status(501).json({
      status: false,
      message: e.message
    })
  })
})
export default router