import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import { users } from "../db.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

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
    return res.status(400).json({
      "errors": [
        {
          "msg": "This user already exists"
        }
      ]
    })
  }

  const HashedPassword = await bcrypt.hash(password, 10)

  users.push({
    email,
    password: HashedPassword
  })

  // Payload
  const token = await jwt.sign({
    email
    // Below, use an ENV reference
  }, "nfb32iur32ibfqfvi3vf932bg932g932", {
    expiresIn: 360000
  })

  res.json({
    token
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  
  // Check if user with email exists
  let user = users.find((user) => {
      return user.email === email
  });

  if(!user){
      return res.status(422).json({
          errors: [
              {
                  msg: "Invalid Credentials",
              }
          ]
      })
  }

  // Check if the password if valid
  if(!await bcrypt.compare(password, user.password)){
    return res.status(404).json({
        errors: [
            {
                msg: "Invalid Credentials" 
            }
        ]
    })
  }

  // Send JSON WEB TOKEN
  const token = await jwt.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g932", {expiresIn: 360000})

  res.json({
      token
  })
})

router.get("/all", (req, res) => {
  res.json(users)
})

export default router