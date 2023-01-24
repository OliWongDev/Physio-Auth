import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import { users } from "../db.js"
import bcrypt from "bcrypt"

const router = Router()

router.post('/signup', [
  check("email", "Please provide a valid email")
    .isEmail(),
  check("password", "Please provide a password that is greater than 5 characters.")
    .isLength({
      min: 6
    })
], async (req, res) => {
  const { password, email } = req.body

  // VALIDATED THE INPUT
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array()
    })

  // VALIDATE IF USER DOESN'T ALREADY EXIST

  let user = users.find((user) => {
    return user.email === email
  })

  if(user) {
    res.status(400).json({
      "errors": [
        {
          "msg": "This user already exists"
        }
      ]
    })
  }

  let HashedPassword = await bcrypt.hash(password, 10)

  users.push({
    email,
    password: HashedPassword
  })

  res.send("Validation Pass")
})

router.get("/all", (req, res) => {
  res.json(users)
})

export default router