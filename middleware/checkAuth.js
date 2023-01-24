import jwt from 'jsonwebtoken'

export const checkAutho = async (req, res, next) => {
  const token = req.header('x-auth-token')

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
    req.user = user.email
    next()
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

export default { checkAutho}