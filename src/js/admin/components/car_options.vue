<template lang="pug">
.form
	.field
		label.label.is-large.mb-4 Спецификации

	.field.is-horizontal
		.field-label.is-small
			label.label Объём двигателя
		.field-body
			.field.has-addons
				.control.is-expanded
					input.input.is-small( v-model='options.engine_volume' )
				p.control
					span.button.is-small.is-static л.

	
	.field.is-horizontal
		.field-label.is-small
			label.label Мощность
		.field-body
			.field.has-addons
				.control.is-expanded
					input.input.is-small( v-model='options.power' )
				p.control
					span.button.is-small.is-static л.с.

	
	.field.is-horizontal
		.field-label.is-small
			label.label Макс. скорость
		.field-body
			.field.has-addons
				.control.is-expanded
					input.input.is-small( v-model='options.max_speed' )
				p.control
					span.button.is-small.is-static км/ч

	
	.field.is-horizontal
		.field-label.is-small
			label.label Разгон до 100 км/ч
		.field-body
			.field.has-addons
				.control.is-expanded
					input.input.is-small( v-model='options.to_100' )
				p.control
					span.button.is-small.is-static с.

	
	.field.is-horizontal
		.field-label.is-small
			label.label Трансмиссия
		.field-body
			.field
				.control.is-expanded
					input.input.is-small( v-model='options.transmission_ru' placeholder="RU" )
			.field
				.control.is-expanded
					input.input.is-small( v-model='options.transmission_en' placeholder="EN" )

	
	.field.is-horizontal
		.field-label.is-small
			label.label Кол-во мест
		.field-body
			.field.has-addons
				.control.is-expanded
					input.input.is-small( v-model='options.seats' )
				p.control
					span.button.is-small.is-static м.
	

	.field.is-horizontal
		.field-label.is-small
			label.label Доп. оборудование
		.field-body
			.field.has-small-input
				.control.has-icons-left
					o-inputitems( iconPack="fas" icon="angles-right"  v-model='options.equipment' )
	
	.field.is-grouped
		.control
			label.checkbox.is-flex.is-align-items-center.is-justify-content-flex-start
				input.mr-2( v-model='options.navigation' type="checkbox" )
				|Система навигации
		.control
			label.checkbox.is-flex.is-align-items-center.is-justify-content-flex-start
				input.mr-2( v-model='options.freeDelivery' type="checkbox" )
				|Бесплатная доставка
		.control
			label.checkbox.is-flex.is-align-items-center.is-justify-content-flex-start
				input.mr-2( v-model='options.fastDelivery' type="checkbox" )
				|Быстрая доставка
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue"

const emit = defineEmits(["update:modelValue"])
const props = defineProps({ modelValue: Object })

const modelValue = computed(() => props.modelValue)
const options = ref(modelValue.value || {})

watch(() => ({ ...options.value }), () => emit("update:modelValue", options.value))

onMounted(() => {
	document.querySelector(".has-small-input input.input").classList.add("is-small")
})
</script>

<style lang="scss" scoped>
.form {
	width: 100%;
}

.field-body {
	flex: 2;
}

.field {
	&:deep(.tag) {
		.icon {
			position: relative!important;
		}
	}
}
</style>