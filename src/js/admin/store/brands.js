import { defineStore } from "pinia"
import ApiController from "@api/Main"

const api = new ApiController("brands")

export const useBrandStore = defineStore("brand", {
	state: () => ({
		allBrands: null,
		brands: null,
		page: 1,
		limit: 25,
		total: 0,
		keyword: "",
		pending: false
	}),

	actions: {
		getBrands() {
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

		getAllBrands() {
			return api.getAll()
				.then(brands => this.allBrands = brands)
		},

		async createBrand(body) {
			try {
				const data = await api.create(body)

				await this.getBrands()

				if (this.allBrands) this.getAllBrands()

				return data
			} catch(err) { return Promise.reject(err) }

		},

		async editBrand(...args) {
			try {
				await api.edit(...args)

				await this.getBrands()

				if (this.allBrands) await this.getAllBrands()

				return Promise.resolve(true)
			} catch(err) { return Promise.reject(err) }
		},

		checkBrand(body) {
			return api.check(body)
		}
	}
})