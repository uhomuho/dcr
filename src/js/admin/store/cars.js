import { defineStore } from "pinia"
import ApiController from "@api/Main"

const api = new ApiController("cars")

export const useCarStore = defineStore("car", {
	state: () => ({
		cars: null,
		page: 1,
		limit: 25,
		total: 0,
		keyword: "",
		pending: false
	}),

	actions: {
		getCars() {
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

		async createCar(body) {
			try {
				const data = await api.create(body)

				await this.getCars()

				return data
			} catch(err) { return Promise.reject(err) }

		},

		checkCar(body) {
			return api.check(body)
		},

		async editCar(...args) {
			try {
				const data = await api.edit(...args)

				await this.getCars()

				return data
			} catch(err) { return Promise.reject(err) }
		},

		async remove(id) {
			try {
				await api.remove(id)
				await this.getCars()

				return Promise.resolve(true)
			} catch(err) { return Promise.reject(err) }
		}
	},
	getters: {
		formatedCars: state => {
			if (state.cars) {
				return state.cars.map(car => {
					const main = car.images.find(({ main }) => !!main)
					return { 
						...car, 
						image: main ? `/cars/${main.name}_480.webp` : null,
						brand: car.brand?.name 
					}
				})
			}
			return null
		}
	}
})