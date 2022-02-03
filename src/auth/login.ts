import bcrypt from "bcrypt"
import express from 'express'
import { User } from "../data/user"
const router = express.Router()

// path "/login". Login page.
router.post('/',
  async (req, res) => {
    try {
      const { email, password } = req.body

      let query
      if (email && password) {
        query = await User.findOne({ email: email })
      } else {
        return res.status(401).json({ message: "Invalid credentials." })
      }

      // If email doesn't exist.
      if (!query) {
        return res.json({ message: "Couldn't find your account." })
      }

      const isMatch = await bcrypt.compare(password, query.hash)

      if (isMatch) {
        return res.status(202).json({ message: "Login successful." })
      }

      return res.status(401).json({ message: "Invalid credentials." })
    } catch (e) {
      return res.send({ message: "Something went wrong." }).status(500)
    }
  })

export default router