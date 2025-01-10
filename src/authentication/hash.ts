import bcrypt from "bcryptjs"

export async function generateHash(password: string): Promise<string> {
	return await bcrypt.hash(password, await bcrypt.genSalt(10))
}

export async function compareHash(password: string, hash: string): Promise<boolean> {
	return await bcrypt.compare(password, hash)
}