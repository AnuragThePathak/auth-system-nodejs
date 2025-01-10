import { Schema } from "mongoose"

export interface IAuthentication {
	password: string
	sessionToken: string
}

export interface IUser extends Document {
	username: string
	email: string
	authentication: Partial<IAuthentication>
}

const User = new Schema<IUser>({
	username: { type: String, required: true, select: true },
	email: { type: String, required: true, select: true },
	authentication: {
		password: { type: String, select: false }
	}
})

export default User