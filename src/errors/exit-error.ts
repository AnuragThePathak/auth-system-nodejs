export default class ExitError extends Error {
	exitCode: number
	constructor(message = "Normal Exit", code = 0) {
		super(message)
		this.exitCode = code
		Error.captureStackTrace(this, this.constructor)
	}
}