<template lang="pug">
container.head( hero )
	img.logo.is-absolute( v-lazy='"/img/head_logo.webp"' )
	.total.is-absolute
		p( v-html='tc("heading.total.homepage", 2, { total: 2 })' )
	.columns.is-flex.is-multiline
		.column.is-7-desktop.is-6-tablet.is-12-mobile
			img( v-lazy='`/img/homepage_header${isMobile ? "_mobile" : ""}.webp`' )
		.column.is-5-desktop.is-6-tablet.is-12-mobile
			.content.is-flex.is-flex-direction-column.is-align-items-flex-end.is-justify-content-center
				h1( v-html='t("homepage.heading.rent")' )
				p( v-html='t("homepage.heading.subtitle")' )

container.brands
	BrandsCarousel
</template>

<script setup>
import BrandsCarousel from "@c/brands_carousel.vue"

import { inject, computed } from "vue";
import { useLocaleStore } from "@/store/locale"

const ls = useLocaleStore()
const isMobile = inject("isMobile")

const t = computed(() => ls.translate)
const tc = computed(() => ls.pluralization)
</script>

<style src="@p/css/homepage.css">
</style>