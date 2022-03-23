<template lang="pug">
nav.pagination.my-2( 
	v-if='lastPage > 1'
	role="navigation" aria-label="pagination" )
	a.pagination-previous(
		:class='{ "is-disabled": prev <= 0 }'
		@click='prev > 0 ? switchPage(prev) : null') Назад
	a.pagination-next(
		:class='{ "is-disabled": next > lastPage }'
		@click='next < lastPage ? switchPage(next) : null') Далее
	ul.pagination-list
		template( v-if='current >= 7' )
			PaginationItem( :page='1' @click='switchPage(1)' )
			li
				span.pagination-ellipsis &hellip;

		PaginationItem(
			v-for='(page, i) in previousItems' :key='i'
			:page='page' @click='switchPage(page)')
		PaginationItem( :page='current' current )
		PaginationItem(
			v-for='(page, i) in nextItems' :key='i'
			:page='page' @click='switchPage(page)')

		template( v-if='current < lastPage - 5 && lastPage > 5' )
			li
				span.pagination-ellipsis &hellip;
			PaginationItem( :page='lastPage' @click='switchPage(lastPage)' )
</template>

<script setup>
import PaginationItem from "@c/pagination_item.vue"

import { computed } from "vue"
import { useRouter } from "vue-router"

const $router = useRouter()
const props = defineProps({
	total: Number,
	limit: Number,
	current: Number
})
const emit = defineEmits([ "switchPage" ])

const total = computed(() => props.total)
const limit = computed(() => props.limit)
const current = computed(() => props.current)
const lastPage = computed(() => Math.ceil(total.value / limit.value))
const prev = computed(() => current.value - 1)
const next = computed(() => current.value + 1)
const previousItems = computed(() => {
	let b = current.value - 3
	let data = []
	do {
		if (b > 0)
			data.push(b)
		b++
	} while (b < current.value)
	return data
})
const nextItems = computed(() => {
	let n = current.value + 1
	let data = []
	do {
		if (n <= lastPage.value)
			data.push(n)
		n++
	} while (n < current.value + 4)
	return data
})

const switchPage = page => {
	emit("switchPage", page)
	$router.push({ query: { p: page } })
}
</script>

<style lang="scss"></style>