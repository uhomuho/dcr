<template lang="pug">
Header
main.hero-body
	router-view
Footer
</template>

<script setup>
import Header from "@c/header.vue"
import Footer from "@c/footer.vue"
import { onMounted } from "vue";

onMounted(() => {
	const loading = document.querySelector("#loading")
	const loading_style = document.querySelector("#loading_style")

	if (loading) {
		loading.classList.add("fade_out")
		setTimeout(() => {
			loading.remove()
			loading_style.remove()
		}, 300)
	}
})
</script>