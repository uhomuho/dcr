<template lang="pug">
ul.lang_switch.is-flex.is-justify-content-flex-end( v-if='defaultName' )
	li( v-for='({ label, icon, to }, i) in langs' :key='i' )
		router-link.router-link.is-flex.is-align-items-center.is-justify-content-center.p-1( :to='to' )
			span.icon.mr-2
				component( :is='icon' )
			p {{ label }}
</template>

<script setup>
import { useRoute } from "vue-router"
import { computed } from "vue"

import RU from "@p/img/ru.svg"
import US from "@p/img/us.svg"

/** Инициализируем Composition api модулей */
const $route = useRoute()

/** Variables */
const defaultName = computed(() => !!$route?.name ? $route.name.replace(/^(ru|en)_/, "") : null)

const langs = computed(() => ([
	{ label: "English", icon: US, to: { name: `en_${defaultName.value}` } },
	{ label: "Русский", icon: RU, to: { name: `ru_${defaultName.value}` } }
]))
</script>
