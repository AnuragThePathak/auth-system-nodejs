import { Router } from "express"

export default interface RouterInterface {
	register(router: Router): void
}