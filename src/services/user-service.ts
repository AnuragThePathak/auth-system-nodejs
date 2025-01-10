import {compareHash, generateHash} from "../authentication/hash"
import { generateToken } from "../authentication/jwt"
import DuplicateError from "../errors/duplicate-error"
import ValidationError from "../errors/validation-error"
import { IUser } from "../models/user"
import UserRepository from "../repositories/user-repository"
import ResponseUserEntity from "../types/user"

class UserService {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async createUser(user: IUser): Promise<ResponseUserEntity> {
		const { email, username, authentication: { password } } = user

		if (!email || !username || !password) {
			throw new ValidationError("Insufficient data")
		}

		const existingUser = await this.userRepository.getUserByEmail(email)
		// username may not be unique
		if (existingUser) {
			throw new DuplicateError("User with this email already exists")
		}

		user.authentication.password = await generateHash(password)

		user = await this.userRepository.createUser(user)
		return new ResponseUserEntity(user.email, user.username)
	}
	
	async loginUser(email: string, password: string): Promise<ResponseUserEntity> {
		const user = await this.userRepository.getUserByEmail(email, 1)
		if (!user || !user.authentication.password) {
			throw new ValidationError("User not found")
		}

		if (!(await compareHash(password, user.authentication.password))) {
			throw new ValidationError("Incorrect password")
		}
		return new ResponseUserEntity(user.email, user.username, generateToken(user.email))
	}

	async getUserById(id: string): Promise<IUser> {
		const user = await this.userRepository.getUserById(id)
		if (!user) {
			throw new Error("User not found")
		}
		return user
	}

	async getUserByEmail(email: string): Promise<IUser> {
		const user = await this.userRepository.getUserByEmail(email)
		if (!user) {
			throw new Error("User not found")
		}
		return user
	}

	async deleteUserById(id: string): Promise<IUser> {
		return await this.userRepository.deleteUserById(id)
	}
}

export default UserService