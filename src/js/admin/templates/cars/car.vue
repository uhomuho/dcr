<template lang="pug">
CarForm( v-model='data' @submit='save' :pending='pending' )
</template>

<script setup>
import CarForm from "@c/car_form.vue"

import ApiController from "@api/Main"
import { useRoute, useRouter } from "vue-router"
import { computed, ref } from "vue"
import { useProgrammatic } from "@oruga-ui/oruga-next"
import { useCarStore } from "@/store/cars"

const { oruga } = useProgrammatic()
const api = new ApiController("cars")
const cs = useCarStore()
const $route = useRoute()
const $router = useRouter()

const id = computed(() => $route.params.id)
const carData = await api.get(id.value).catch(() => $router.push({ name: "Cars" }))
const pending = ref(false)
const data = ref(carData)

const hasEmpty = computed(() => !data.value.car.name || !data.value.car.slug || !data.value.car.year)

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
	const { car, brand, meta, options, images } = data.value

	const formData = new FormData()

	const old_images = []
	for (let i in images) {
		let img = images[i]
		img.position = parseInt(i)
		
		if (img.type) {
			let mimetype = img.name.split(".")[img.name.split(".").length - 1]
			formData.append("files", img, `${i}.${mimetype}`)
		} else {
			old_images.push(img)
		}
	}

	formData.append("data", JSON.stringify({
		car, brand, meta, options, images: old_images
	}))

	cs.editCar(id.value, formData)
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
				message: "При сохранении автомобиля возникла ошибка",
				position: 'bottom-right',
				variant: 'danger',
				closable: true
			})
		})
}
</script>