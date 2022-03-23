import { defineStore } from "pinia"
import ApiController from "@api/Main"

const api = new ApiController("members")

export const useMemberStore = defineStore("member", {
	state: () => ({
		members: null,
		page: 1,
		limit: 25,
		total: 0,
		keyword: "",
		pending: false
	}),

	actions: {
		getMembers() {
			this.pending = true

			let params = { 
				page: this.page,
				limit: this.limit,
				keyword: this.keyword 
			}
			return api.getPaginated(params)
				.then(res => {
					Object.keys(res).forEach(prop => this[prop] = res[prop])
					this.pending = false
				})
		},

		async createMember(body) {
			try {
				const data = await api.create(body)

				await this.getMembers()

				return data
			} catch(err) { return Promise.reject(err) }

		},

		async editMember(...args) {
			try {
				const data = await api.edit(...args)

				await this.getMembers()

				return data
			} catch(err) { return Promise.reject(err) }
		},

		async remove(id) {
			try {
				await api.remove(id)
				await this.getMembers()

				return Promise.resolve(true)
			} catch(err) { return Promise.reject(err) }
		}
	}
})