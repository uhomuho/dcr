import { createRouter, createWebHistory } from "vue-router"

import routes from "./routes"

import pinia from "@/store"
import { useLocaleStore } from "@/store/locale"

export default createRouter({
	history: createWebHistory(),
	linkActiveClass: "router-link",
	linkExactActiveClass: "router-link-active",
	routes: ["ru", "en"].map(locale => ({
		path: `/${locale == "ru" ? locale : ""}`,
		component: {
			template: "<router-view/>"
		},
		children: routes(locale),
		beforeEnter: (to, from, next) => {
			const store = useLocaleStore( pinia )

			const browserLang = navigator.language.split('-')[0]
			if (!localStorage.getItem("checkedLang") && browserLang) {
				localStorage.setItem("checkedLang", true)
				
				return next({ name: `${browserLang}_${to.name.replace(/^(ru|en)_/, "")}` })
			}

			store.setLocale(locale)

			next()
		}
	})),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
	}
})