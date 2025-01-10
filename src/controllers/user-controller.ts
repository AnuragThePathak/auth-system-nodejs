import { Request, Response, Router } from "express"
import expressAsyncHandler from "express-async-handler"
import { IUser } from "../models/user"
import UserService from "../services/user-service"
import authorize from "../middlewares/authorize"

export default class UserController {

	private userService: UserService

	constructor(userService: UserService) {
		this.userService = userService
	}

	register(router: Router) {
		router.post("/users", this.createUser)
		router.post("/users/login", this.loginUser)
		router.get("/users/:id", authorize, this.getUserById)
		router.get("/users/email/:email", authorize, this.getUserByEmail)
		router.delete("/users/:id", authorize, this.deleteUserById)
	}

	createUser = expressAsyncHandler(
		async (req: Request, res: Response, _) => {
			const { email, username, password } = req.body
			const user = await this.userService.createUser({ email, username, authentication: { password } } as IUser)
			res.json(user)
		})

	loginUser = expressAsyncHandler(
		async (req: Request, res: Response, _) => {
			const { email, password } = req.body
			const user = await this.userService.loginUser(email, password)
			res.json(user)
		})

	getUserById = expressAsyncHandler(
		async (req: Request, res: Response, _) => {
			const user = await this.userService.getUserById(req.params.id)
			res.json(user)
		})

	getUserByEmail = expressAsyncHandler(
		async (req: Request, res: Response, _) => {
			const user = await this.userService.getUserByEmail(req.params.email)
			res.json(user)
		})

	deleteUserById = expressAsyncHandler(
		async (req: Request, res: Response, _) => {
			const user = await this.userService.deleteUserById(req.params.id)
			res.json({ message: `User ${user.username} deleted` })
		})

}