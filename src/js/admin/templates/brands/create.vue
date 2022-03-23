<template lang="pug">
form.form( @submit.prevent='create' )
	.field
		label.label.is-large.mb-4 Данные
	NameField( v-model='brand' :validator='bs.checkBrand' @slugCheck='slugExist = $event' )
	Meta( v-model='meta' )
	o-field
		button.button.is-primary.is-fullwidth( :class='{ "is-loading": pending }' ) Создать
</template>

<script setup>
import NameField from "@c/name_slug_field.vue"
import Meta from "@c/meta.vue"

import { useBrandStore } from "@/store/brands"

import { useProgrammatic } from "@oruga-ui/oruga-next"
import { useRouter } from "vue-router"
import { computed, ref } from "vue"

const bs = useBrandStore()

const $router = useRouter()
const { oruga } = useProgrammatic()

const brand = ref(null)
const meta = ref(null)
const slugExist = ref(false)
const pending = ref(false)

const hasEmpty = computed(() => {
	const data = brand.value
	return !!(Object.keys(data).map(prop => data[prop]).find(item => item == "" || item == null))
})

const create = () => {
	if (pending.value) return

	if (slugExist.value)
		return oruga.notification.open({
			duration: 5000,
			message: `Бренд с такой ссылкой уже существует`,
			position: 'bottom-right',
			variant: 'danger',
			closable: true
		})

	if (hasEmpty.value)
		return oruga.notification.open({
			duration: 5000,
			message: `Заполнены не все обязательные поля`,
			position: 'bottom-right',
			variant: 'danger',
			closable: true
		})

	pending.value = true
	bs.createBrand({ brand: brand.value, meta: meta.value })
		.then(() => {
			$router.push({ name: "Brands" })
		})
		.catch(() => pending.value = false)
}
</script>

<style lang="scss"></style>