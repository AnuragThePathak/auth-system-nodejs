import { NextFunction, Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import UnauthorizedError from "../errors/unauthorized-error"
import { verifyToken } from "../authentication/jwt"

const authorize = expressAsyncHandler((req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
		throw new UnauthorizedError()
	}
	const token = req.headers.authorization.split(" ")[1]
	req.headers.authorization = (verifyToken(token) as {email: string}).email
	next()
})

export default authorize