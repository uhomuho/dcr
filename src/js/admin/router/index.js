import { createRouter, createWebHistory } from "vue-router"

import routes from "./routes"

export default createRouter({
	history: createWebHistory("/admin/"),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
	}
})