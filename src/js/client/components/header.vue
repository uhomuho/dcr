<template lang="pug">
header#header.hero-head
	.container.is-flex.is-align-items-center.is-justify-content-space-between
		.start
			router-link.logo.is-flex.is-align-items-center.is-justify-content-center( :to='{ name: to("Homepage") }' )
				img( v-lazy='"/img/header_logo.webp"' )
		.end.is-flex.is-align-items-center.is-justify-content-space-between
			.menu
				ul.is-flex.is-align-items-center.is-justify-content-center
					li.is-flex.is-align-items-center.is-justify-content-center.px-2( v-for='({ to, label }, i) in routes' :key='i' )
						router-link( :to='to' ) {{ label }}
			LangSwitch

</template>

<script setup>
import LangSwitch from "@c/lang_switch.vue"

import { computed } from "vue"
import { useLocaleStore } from "@/store/locale"

const ls = useLocaleStore()

const routes = computed(() => ([
	{ to: "", label: t("heading.reviews") },
	{ to: "", label: t("footer.links.contacts") },
	{ to: "", label: "FAQ" },
	{ to: "", label: t("footer.links.affiliate") }
]))


const t = ls.translate
const to = computed(() => ls.to)
</script>