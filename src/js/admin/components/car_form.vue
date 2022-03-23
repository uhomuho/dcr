<template lang="pug">
form.form( @submit.prevent='submit' )
	.field
		label.label.is-large.mb-4 Данные
	.field.is-relative.is-grouped
		label.label.on-border
			span Бренд&nbsp;
			span.has-text-danger *
		.control.is-expanded( :class='{ "has-icons-left": gettingBrands }' )
			.select.is-expanded
				select( placeholder="Выберите бренд" v-model='data.brand' )
					option( v-for='(brand, i) in brands' :key='i' :value='brand' ) {{ brand.name }}
			span.icon.is-left.has-text-info( v-if='gettingBrands' )
				fa( icon="spinner" spin )
		.control.is-flex-grow-0.is-flex( v-if='data.brand' )
			label.checkbox.is-flex.is-align-items-center.is-justify-content-flex-start
				input.mr-2( v-model='data.car.active' type="checkbox" )
				|Активна
				
	template( v-if='data.brand && !!Object.keys(data.brand).length' )
		NameField( v-model='data.car' :validator='cs.checkCar' @slugCheck='slugExist = $event' :brand='data.brand' :year='data.car.year' )
		.field.is-relative.is-grouped.mt-5
			label.label.on-border 
				span Год выпуска&nbsp;
				span.has-text-danger *
			.control.is-expanded
				input.input( v-model='data.car.year' type="number" )
			.field.has-addons
				.control
					span.button.is-static $
				label.label.on-border Депозит
				.control
					input.input( v-model='data.car.deposit' )
			.field.has-addons
				.control
					span.button.is-static $
				label.label.on-border Цена за сутки
				.control
					input.input( v-model='data.car.price' )
		hr
		Tiles
			Options( v-model='data.options' )
			Images( v-model='data.images' )
		Meta( v-model='data.meta' )
		.field
			.control
				button.button.is-fullwidth.is-primary( :class='{ "is-loading": pending }' ) Сохранить
</template>

<script setup>
import NameField from "@c/name_slug_field.vue"
import Options from "@c/car_options.vue"
import Images from "@c/car_images.vue"
import Meta from "@c/meta.vue"
import Tiles from "@c/tiles.vue"

import { useProgrammatic } from "@oruga-ui/oruga-next"
import { useBrandStore } from "@/store/brands"
import { useCarStore } from "@/store/cars"
import { ref, computed, watch } from "vue"

const { oruga } = useProgrammatic()
const bs = useBrandStore()
const cs = useCarStore()

const emit = defineEmits([ "submit", "update:modelValue" ])
const props = defineProps({ modelValue: Object, pending: Boolean })

const modelValue = computed(() => props.modelValue)
const gettingBrands = ref(false)
const slugExist = ref(false)
const data = ref(modelValue.value || {
	brand: null,
	car: { active: true },
	meta: null,
	options: null,
	images: null
})

const brands = computed(() => bs.allBrands)
const pending = computed(() => props.pending)

watch(() => ({ ...data.value }), val => emit("update:modelValue", val))

const submit = () => {
	if (slugExist.value)
		return oruga.notification.open({
			duration: 5000,
			message: "Автомобиль с такой ссылкой уже существует",
			position: 'bottom-right',
			variant: 'danger',
			closable: true
		})

	emit("submit")
}

if (!brands.value) {
	gettingBrands.value = true;
	await bs.getAllBrands()
	gettingBrands.value = false
}
</script>

<style lang="scss" scoped>
.select, select {
	width: 100%;
}
</style>