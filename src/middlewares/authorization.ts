import { RequestHandler } from "express"
import jwt from "jsonwebtoken"

const authorization: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader?.split(" ")[1]

  if (token) {
    res.status(401).json({ message: "Unauthorized access." })
    return
  }

  jwt.verify(token!, process.env.JWT_SIGN as string, {
    issuer: "Anurag Pathak",
    maxAge: "4d"
  },
    (err, payload) => {
      if (err) {
        res.status(403).json({ message: "Invalid request" })
        return
      }

      req.payload = payload
      next()
    })
}

export default authorization