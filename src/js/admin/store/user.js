import { defineStore } from "pinia"
import AuthController from "@api/Auth"

const auth = new AuthController()

export const useUserStore = defineStore("user", {
	state: () => ({
		user: null
	}),

	actions: {
		async authByToken() {
			await auth.byToken()
				.then(user => this.user = user)
				.catch(() => null)
		},

		auth(body) {
			return auth.basic(body)
				.then(user => this.user = user)
		}
	}
})