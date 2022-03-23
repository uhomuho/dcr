<template lang="pug">
.field.is-grouped
	.control
		.field.is-relative
			label.label.on-border 
				span Название&nbsp;
				span.has-text-danger *
			.control
				input.input( @input='$emit("update:modelValue", data)' v-model='data.name' )
	.control
		.field.has-addons.is-relative
			.control
				span.button.is-static dcr-motors.com/{{ brand ? `${brand.slug}/` : "" }}
			label.label.on-border 
				span Ссылка&nbsp;
				span.has-text-danger *
			.control.primary.has-icons-right( :class='pending || slugExist ? "has-icons-right" : ""' )
				input.input( @input='$emit("update:modelValue", data)' v-model='data.slug' )
				span.icon.is-small.is-right.has-text-danger( v-if='slugExist' )
					fa( icon="circle-exclamation" )
				span.icon.is-small.is-right.has-text-black( v-if='pending' )
					fa( icon="spinner" spin )
			p.help.has-text-danger( v-if='slugExist' ) Такая ссылка уже существует
</template>

<script setup>
import slugify from "slugify"
import { useRoute } from "vue-router"
import { computed, ref, watch } from "vue"

import debounce from "@/common/debounce"

const props = defineProps({ modelValue: Object, brand: Object, validator: Function, year: String|Number })
const emit = defineEmits([ "update:modelValue", "slugCheck" ])

const $route = useRoute()

const modelValue = computed(() => props.modelValue)
const data = ref(modelValue.value || {})
const slugExist = ref(false)
const pending = ref(false)
const validator = computed(() => props.validator)
const year = computed(() => props.year)

watch(() => data.value.name, changed => data.value.slug = slugify(changed, { replacement: "_", lower: true }))
watch(() => data.value.slug, changed => data.value.slug = slugify(changed, { replacement: "_", lower: true }))
watch(() => year.value, changed => data.value.slug = `${slugify(data.value.name, { replacement: "_", lower: true })}${changed ? "_" + changed : ""}`)

watch(() => data.value.slug, debounce(changed => {
	slugExist.value = false
	pending.value = true
	validator.value({ slug: changed, brand: props.brand?.id, exclude: $route.params.id })
		.then(exist => {
			pending.value = false
			slugExist.value = exist
			emit("slugCheck", exist)
		})
}, 500))
</script>

<style lang="scss" scoped>
.field.is-grouped {
	&>.control {
		flex: 1;
		.field.has-addons {
			.control.primary {
				flex: 1;
			}
		}
	}
}
</style>