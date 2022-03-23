<template lang="pug">
hr
.field
	label.label.is-large.mb-4 Мета
.field.is-grouped
	.control
		.field.is-relative
			label.label.on-border Title (ru)
			.control
				input.input( v-model='data.ru.title' )
	.control
		.field.is-relative
			label.label.on-border Title (en)
			.control
				input.input( v-model='data.en.title' )


.field.is-grouped
	.control
		.field.is-relative
			label.label.on-border Description (ru)
			.control
				textarea.textarea( v-model='data.ru.description' )
	.control
		.field.is-relative
			label.label.on-border Description (en)
			.control
				textarea.textarea( v-model='data.en.description' )


.field.is-grouped
	.control
		.field.is-relative
			label.label.on-border Keywords (ru)
			.control
				o-inputitems( v-model='data.ru.keywords' iconPack="fas" icon="angles-right" )
	.control
		.field.is-relative
			label.label.on-border Keywords (en)
			.control
				o-inputitems( v-model='data.en.keywords' iconPack="fas" icon="angles-right" )
hr
</template>

<script setup>
import { watch, computed, ref } from "vue"

const emit = defineEmits(["update:modelValue"])
const props = defineProps({ modelValue: Object })

const modelValue = computed(() => props.modelValue)
const data = ref(modelValue.value || { ru: {}, en: {} })

Object.keys(data.value).map(prop => {
	watch(() => ({ ...data.value[prop] }), () => emit("update:modelValue", data.value))
})
</script>

<style lang="scss">
.field.is-grouped {
	&>.control {
		flex: 1;
	}
}
</style>