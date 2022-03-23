<template lang="pug">
CarForm( v-model='data' @submit='create' :pending='pending' )
</template>

<script setup>
import CarForm from "@c/car_form.vue"

import { useCarStore } from "@/store/cars"

import { useProgrammatic } from "@oruga-ui/oruga-next"
import { useRouter } from "vue-router"
import { ref, computed } from "vue"

const $router = useRouter()
const { oruga } = useProgrammatic()
const cs = useCarStore()

const pending = ref(false)
const data = ref(null)

const hasEmpty = computed(() => !data.value.car.name || !data.value.car.slug || !data.value.car.year)

const create = () => {
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
	const formData = new FormData()

	for (let image of data.value.images) {
		formData.append("files", image)
	}

	formData.append("data", JSON.stringify({
		brand: data.value.brand,
		car: data.value.car,
		meta: data.value.meta,
		options: data.value.options
	}))

	cs.createCar(formData)
		.then(() => $router.push({ name: "Cars" }))
		.catch(err => {
			oruga.notification.open({
				duration: 5000,
				message: `${err.status}: ${err.message}`,
				position: 'bottom-right',
				variant: 'danger',
				closable: true
			})
		})
}
</script>