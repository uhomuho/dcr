import { defineStore } from "pinia"

export const useLocaleStore = defineStore("locale", {
	state: () => ({
		$i18n: null
	}),
	actions: {
		setLocale(lang) {
			this.$i18n.locale = lang
		},
		translate(...args) {
			return this.$i18n.t(...args)
		},
		pluralization(...args) {
			return this.$i18n.tc(...args)
		}
	},

	getters: {
		locale: state => state.$i18n.locale,
		to: state => name => `${state.$i18n.locale}_${name}`
	}
})