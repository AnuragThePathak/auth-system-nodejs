import AppError from "./app-error"

export default class ValidationError extends AppError {
	constructor(message = "Invalid Input") {
		super(message, 400)
	}
}