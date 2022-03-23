<template lang="pug">
Table( 
	:columns='columns' 
	:data='data' 
	route="Car" 
	:pending='pending' 
	deletable 
	:store='cs' )
</template>

<script setup>
import Table from "@c/table.vue"

import { computed, watch } from "vue"
import { useRoute } from "vue-router"
import { useCarStore } from "@/store/cars"

const $route = useRoute()
const cs = useCarStore()

const columns = [ 
	{ field: "id", label: "ID" }, 
	{ field: "image", type: "img", label: "Изображение" }, 
	{	field: "name", label: "Название" },
	{ field: "brand", label: "Бренд" },
	{ field: "deposit", label: "Депозит", format: "$" }, 
	{ field: "price", label: "За сутки", format: "$" },
	{ field: "active", type: "checkbox", label: "Активна" } 
]

const pending = computed(() => cs.pending)
const data = computed(() => cs.formatedCars)

watch(() => cs.page, cs.getCars)

if (!data.value) {
	if ($route.query.p)
		cs.page = parseInt($route.query.p)

	cs.getCars()
}
</script>

<style lang="scss"></style>