import AppError from "./app-error"

export default class DuplicateError extends AppError {
	constructor(message = "Resource already exists") {
		super(message, 409)
	}
}