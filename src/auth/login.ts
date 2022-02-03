import express from 'express'
const router = express.Router()

/* GET users listing. */
router.get('/', (_req, res) => {
  res.send('great job')
})

export default router