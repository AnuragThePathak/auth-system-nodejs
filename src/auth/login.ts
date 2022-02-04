import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import { User } from "../data/user"
const router = express.Router()

router.post('/',
  async (req, res) => {
    try {
      const { email, password } = req.body

      if (!(email && password)) {
        return res.status(401).json({ message: "Invalid credentials." })
      }

      const query = await User.findOne({ email })

      if (!query) {
        return res.json({ message: "Couldn't find your account." })
      }

      const isMatch = await bcrypt.compare(password, query.hash)

      const token = generateJwt(email)

      if (isMatch) {
        return res.status(202).json({ message: "Login successful.", token })
      }

      return res.status(401).json({ message: "Invalid credentials." })
    } catch (e) {
      return res.send({ message: "Something went wrong." }).status(500)
    }
  })

function generateJwt(email: string) {
  return jwt.sign({ email }, process.env.JWT_SIGN as string, {
    issuer: "Anurag Pathak",
    expiresIn: "4d"
  })
}

export default router