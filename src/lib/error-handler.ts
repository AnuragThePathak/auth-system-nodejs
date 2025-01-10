import { NextFunction, Request, Response } from "express"

export default function errorHandler(e: any, _: Request, res: Response, __: NextFunction) {
	const statusCode = e.statusCode || 500
	const message = e.message || "Internal Server Error"
	console.log(e)
	res.status(statusCode).json({ message })
}