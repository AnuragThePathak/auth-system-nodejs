import "dotenv/config"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import createError, { HttpError } from 'http-errors'
import mongoose from "mongoose"
import logger from 'morgan'
import loginRouter from "./auth/login"
import signupRouter from "./auth/signup"

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string)
  } catch (e) {
    console.error(e)
  }
}

connect()

mongoose.connection.on('error', function () {
  console.error('Could not connect to MongoDB')
})

mongoose.connection.on('disconnected', () => {
  console.error('Lost MongoDB connection...')
})
mongoose.connection.on('connected', () => {
  console.log('Connection established to MongoDB')
})

mongoose.connection.on('reconnected', () => {
  console.log('Reconnected to MongoDB')
})

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.log('Force to close the MongoDB conection')
    process.exit(0)
  })
})

app.use("/login", loginRouter)
app.use("/signup", signupRouter)

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404))
})

// error handler
app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

export default app
