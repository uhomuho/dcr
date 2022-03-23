<template lang="pug">

</template>

<script setup>
import Table from "@c/table.vue"

import { computed, watch } from "vue"
import { useRoute } from "vue-router"
import { useMemberStore } from "@/store/members"

const $route = useRoute()
const cs = useMemberStore()

const columns = [ 
	{ field: "id", label: "ID" } 
]

const pending = computed(() => cs.pending)
const data = computed(() => cs.members)

watch(() => cs.page, cs.getMembers)

if (!data.value) {
	if ($route.query.p)
		cs.page = parseInt($route.query.p)

	cs.getMembers()
}
</script>

<style lang="scss"></style>