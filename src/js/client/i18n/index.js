import { createI18n, useI18n } from "vue-i18n/index"

import messages from "./messages"

export { useI18n }

export const i18n = createI18n({
	locale: navigator.language.split('-')[0] || "en",
	fallbackLocale: "en",
	allowCompositoin: true,
	messages
})