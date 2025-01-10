import express from "express"
import http from "http"
import RouterInterface from "./lib/router"
import errorHandler from "./lib/error-handler"
import ExitError from "./errors/exit-error"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"

export function newHTTPServer(routers: RouterInterface[]) {
	const httpRouter = express.Router()
	routers.forEach(router => router.register(httpRouter))
	const server = http.createServer(
		express()
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({ extended: true }))
			.use(cookieParser())
			.use(cors({
				credentials: true,
			}))
			.use(httpRouter)
			.use(errorHandler))
	return server
}

export function listenAndServe(s: http.Server): void {
	const PORT = process.env.PORT || 8080
	s.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})

	// Catch termination signals
	process.on("SIGINT", () => { throw new ExitError("SIGINT") })
	process.on("SIGTERM", () => { throw new ExitError("SIGTERM") })

	// Optional: Catch unhandled exceptions and rejections
	process.on("uncaughtException", (err) => {
		throw new ExitError(`Uncaught exception ${err.message}`, 1)
	})

	process.on("unhandledRejection", (reason, _) => {
		throw new ExitError(`Unhandled rejection ${reason}`, 1)
	})
}
