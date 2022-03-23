<template lang="pug">
form.form( @submit.prevent='save' )
	.field
		label.label.is-large.mb-4 Данные
	NameField( v-model='data.brand' :validator='bs.checkBrand' @slugCheck='slugExist = $event' )
	Meta( v-model='data.meta' )
	o-field
		button.button.is-primary.is-fullwidth( :class='{ "is-loading": pending }' ) Сохранить
</template>

<script setup>
import NameField from "@c/name_slug_field.vue"
import Meta from "@c/meta.vue"

import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useProgrammatic } from "@oruga-ui/oruga-next"

import ApiController from '@api/Main'
import { useBrandStore } from '@/store/brands';

const { oruga } = useProgrammatic()
const api = new ApiController("brands")
const bs = useBrandStore()

const $router = useRouter()
const $route = useRoute()

const data = ref(await api.get($route.params.id).catch(() => $router.push({ name: "Brands" })))
const slugExist = ref(false)
const pending = ref(false)

const hasEmpty = computed(() => !!(Object.keys(data.value.brand).map(prop => data[prop]).find(item => item == "" || item == null)))

const save = () => {
	if (pending.value) return

	if (hasEmpty.value)
		return oruga.notification.open({
			duration: 5000,
			message: `Заполнены не все обязательные поля!<br>Помечены *`,
			position: 'bottom-right',
			variant: 'danger',
			closable: true
		})

	pending.value = true

	bs.editBrand($route.params.id, data.value)
		.then(() => {
			pending.value = false
			oruga.notification.open({
				duration: 5000,
				message: "Изменения успешно сохранены",
				position: "bottom-right",
				variant: "success",
				closable: true
			})
		})
		.catch(() => {
			pending.value = false
			oruga.notification.open({
				duration: 5000,
				message: "При сохранении бренда возникла ошибка",
				position: 'bottom-right',
				variant: 'danger',
				closable: true
			})
		})
}
</script>

<style lang="scss"></style>