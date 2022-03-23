import axios from "axios"
import { useUserStore } from "@/store/user"
import pinia from "@/store"
import router from "../router"

const instance = axios.create({
	baseURL: "/json/admin/",
	withCredentials: true
})


instance.interceptors.response.use(
	res => res.data,
	err => {
		const us = useUserStore(pinia)

		if (err.response.status == 401) {
			us.user = null
			router.push({ name: "Auth" })
		}

		if (typeof err.response.data == "object")
			err.response.data.status = err.response.status 

		return Promise.reject(err.response.data)
	}
)

export default instance