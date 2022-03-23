<template lang="pug">
Suspense
	template( #default )
		Main
	template( #fallback )
		h1 Auth processing...
</template>

<script setup>
import Main from "@tpl/main.vue"
</script>