import AppError from "./app-error"

export default class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404)
	}
}