export default class ResponseUserEntity {
	username: string
	email: string
	sessionToken?: string

	constructor(username: string, email: string, sessionToken?: string) {
		this.username = username
		this.email = email
		this.sessionToken = sessionToken
	}
}