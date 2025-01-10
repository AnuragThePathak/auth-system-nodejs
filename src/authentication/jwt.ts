import jwt from "jsonwebtoken"

export function generateToken(email: string) {
	return jwt.sign({email: email}, process.env.SECRET_TOKEN as string, {
		expiresIn: "3h"
	})
}

export function verifyToken(token: string) {
	return jwt.verify(token, process.env.SECRET_TOKEN as string)
}