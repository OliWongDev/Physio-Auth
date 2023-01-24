// CHATGPT SUGGESTION FOR AUTHORIZING SAME USER MIDDLEWARE

import jwt from 'jsonwebtoken'
import User from './models/User' // import the User model

export const checkAutho = async (req, res, next) => {
  const token = req.header('Authorization')

  if(!token) {
    return res.status(404).json({
      "errors": [
        {
          "msg": "No token found"
        }
      ]
    })
  }

  try {
    // Add environment variable link.
    let user = await jwt.verify(token, "nfb32iur32ibfqfvi3vf932bg932g932")
    let dbUser = await User.findOne({ _id: user.id, email: user.email });
    if (dbUser) { // check if user exists in database
      req.user = user
      next()
    } else {
      return res.status(401).json({
        "errors": [
          {
            "msg": "Unauthorized"
          }
        ]
      })
    }
  } catch (error) {
      return res.status(404).json({
        "errors": [
          {
            "msg": "Token invalid"
          }
        ]
      })
  }
}

export default { checkAutho }