<template lang="pug">
Table( 
	:columns='columns' 
	:data='data' 
	route="Brand" 
	:pending='pending'
	:store='bs' )
	//- deletable
</template>

<script setup>
import Table from "@c/table.vue"

import { computed, watch } from "vue"
import { useRoute } from "vue-router"
import { useBrandStore } from "@/store/brands"

const $route = useRoute()
const bs = useBrandStore()

const columns = [ { field: "id", label: "ID" }, {	field: "name", label: "Название" } ]

const pending = computed(() => bs.pending)
const data = computed(() => bs.brands)

watch(() => bs.page, bs.getBrands)

if (!data.value) {
	if ($route.query.p)
		bs.page = parseInt($route.query.p)

	bs.getBrands()
}
</script>

<style lang="scss"></style>