<template lang="pug">
.nav-item( v-if='name' )
	router-link.is-flex.is-align-items-center.is-justify-content-center( :to='{ name }' )
		span.icon.mr-2( v-if='icon' )
			fa( :icon='icon' )
		p.has-text-white
			slot
</template>

<script setup>
defineProps({
	icon: String,
	name: String
})
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/all";

a {
	padding: .5rem .75rem;
	border-radius: 8px;
	&.router-link-active,
	&.router-link-exact-active {
		background: rgba($color: #fff, $alpha: .3);
	}
	&:deep(svg) {
		path {
			fill: #fff;
		}
	}
}
</style>