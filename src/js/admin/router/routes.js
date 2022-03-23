import load from "./load"

import pinia from "@/store"
import { useUserStore } from "@/store/user"

export default [
	{ name: "Dashboard", path: "", component: load("dashboard")},
	{ 
		name: "Auth", path: "/auth", component: load("auth"),
		beforeEnter: ( to, from, next ) => {
			const us = useUserStore(pinia)
			
			if (us.user)
				return next({ name: "Dashboard" })

			next()
		}
	},
	{ 
		path: "/cars", component: load("wrapper"),
		children: [
			{ name: "Cars", meta: { label: "Все автомобили" }, path: "", component: load("cars/list") },
			{ name: "CarCreate", meta: { label: "Добавить" }, path: "create", component: load("cars/create") },
			{ name: "Car", path: ":id", component: load("cars/car") }
		]
	},
	{
		path: "/brands", component: load("wrapper"),
		children: [
			{ name: "Brands", meta: { label: "Все бренды" }, path: "", component: load("brands/list") },
			{ name: "BrandCreate", meta: { label: "Добавить" }, path: "create", component: load("brands/create") },
			{ name: "Brand", path: ":id", component: load("brands/brand") }
		]
	},
	{
		path: "/members", component: load("wrapper"),
		children: [
			{ name: "Members", meta: { label: "Все клиенты" }, path: "", component: load("members/list") }
		]
	}
]