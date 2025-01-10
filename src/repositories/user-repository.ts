import { Model } from "mongoose"
import { IUser } from "../models/user"

class UserRepository {

	private userModel: Model<IUser>

	constructor(userModel: Model<IUser>) {
		this.userModel = userModel
	}

	async createUser(user: Partial<IUser>): Promise<IUser> {
		const newUser = new this.userModel(user)
		return await newUser.save()
	}

	async getUserById(id: string): Promise<IUser | null> {
		const user = await this.userModel.findById(id)
		return user
	}

	async getUserByEmail(email: string, password = 0): Promise<IUser | null> {
		const user =
			await this.userModel.findOne({ email })
				.select({
					"authentication.password": password
				})
		return user
	}

	async deleteUserById(id: string): Promise<IUser> {
		const user = await this.userModel.findByIdAndDelete(id)
		if (!user) {
			throw new Error("User not found or deletion failed")
		}
		return user
	}

}

export default UserRepository