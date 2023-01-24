import { Router } from 'express'
const router = Router()

router.post('/signup', (req, res) => {
  const { password, email } = req.body

  console.log(password, email)

  res.send("Auth route working")
})

export default router