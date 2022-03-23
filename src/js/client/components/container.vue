<template lang="pug">
.hero( v-if='hero' )
	section.section
		.container.is-relative
			slot
section.section( v-else )
	.container
		slot
</template>

<script setup>
const props = defineProps({
	hero: {
		type: Boolean,
		default: false
	}
})
</script>

<style scoped>
.hero, .section, .container {
	width: 100%;
}
</style>