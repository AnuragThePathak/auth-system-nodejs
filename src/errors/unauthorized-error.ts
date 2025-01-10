import AppError from "./app-error"

export default class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, 401)
	}
}