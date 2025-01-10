import { configDotenv } from "dotenv"
import mongoose from "mongoose"
import UserController from "./controllers/user-controller"
import ExitError from "./errors/exit-error"
import User, { IUser } from "./models/user"
import UserRepository from "./repositories/user-repository"
import { listenAndServe, newHTTPServer } from "./server"
import UserService from "./services/user-service"
import { connectToDatabase } from "./database"
import { createHttpTerminator } from "http-terminator"

configDotenv()

// models
const userModel = mongoose.model<IUser>("User", User)

// repositries
const userRepository = new UserRepository(userModel)

// services
const userService = new UserService(userRepository)

// setup server
const server = newHTTPServer([new UserController(userService)])

const httpTerminator = createHttpTerminator({
	server
});

// listen and serve
(async () => {
	try {
		await connectToDatabase()
		listenAndServe(server)
	} catch (e) {
		let exitCode = 1
		if (e instanceof ExitError) {
			exitCode = e.exitCode
		}
		console.error(e)
		await httpTerminator.terminate()
		mongoose.disconnect()
		process.exit(exitCode)
	}
})()