import api from "../index"

export default class AuthController {
	basic(credentials) {
		return api.post("auth", credentials)
	}

	byToken() {
		return api.post(`auth/token`)
	}
}