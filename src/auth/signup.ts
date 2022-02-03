import bcrypt from "bcrypt"
import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { User } from "../data/user"
const router = express.Router()

// path "/signup". Sign up page.
router.post("/",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),

  async (req: Request, res: Response) => {
    const errors = validationResult(req as Request)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { email, password } = req.body

      const query = await User.findOne({ email: email })

      // If that query exists, email not available
      if (query) {
        return res.json({ message: "Email not available." })
      }

      // Hashing
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(password, salt)

      // Create account
      await User.create({
        email: req.body.email,
        hash: hash
      })

      return res.json({ message: "Account created succesfully." }).status(201)

    } catch (e) {
      return res.json({ message: "Something went wrong." }).status(500)
    }
  })

export default router