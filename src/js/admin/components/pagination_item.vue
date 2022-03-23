<template lang="pug">
li
	a.pagination-link( :class='{ "is-current": current }' ) {{ page }}
</template>

<script setup>
defineProps({
	page: Number,
	current: Boolean
})
</script>

<style lang="scss"></style>