import api from "../index"
import q from "@/common/query"

export default class ApiController {
	#path

	constructor(path) {
		this.#path = path
	}

	getPaginated(params) {
		return api.get(`${this.#path}${q(params)}`)
	}

	getAll() {
		return api.get(`${this.#path}/all`)
	}

	get(id) {
		return api.get(`${this.#path}/${id}`)
	}

	edit(id, body) {
		return api.put(`${this.#path}/${id}`, body)
	}

	remove(id) {
		return api.delete(`${this.#path}/${id}`)
	}

	create(body) {
		return api.post(`${this.#path}/create`, body)
	}

	check(body) {
		return api.post(`${this.#path}/check`, body)
	}
}