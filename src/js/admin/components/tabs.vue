<template lang="pug">
.tabs.is-boxed.is-marginless
	ul( v-if='routes && $route' )
		template( v-for='({ name, meta }, i) in routes' :key='i' )
			li( v-if='meta' :class='{ "is-active": name == $route.name }' )
				router-link( :to='{ name }' ) {{ meta.label }}
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const $route = useRoute()
const routes = computed(() => $route.matched[0]?.children)
</script>

<style lang="scss" scoped>
.tabs {
	height: 41px;
}
li {
	&:deep(a) {
		color: #fff;
		&:hover {
			color: #fff;
			background-color: transparent!important;
			border-color: transparent;
			border-bottom-color: transparent;
		}
	}
	&.is-active {
		&:deep(a) {
			color: #000;
			border-color: transparent!important;
			&:hover {
				color: #000;
				background-color: #fff!important;
				border-color: transparent!important;
				border-bottom-color: transparent;
			}
		}
	}
}
</style>