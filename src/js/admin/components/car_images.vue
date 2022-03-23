<template lang="pug">
.form
	.field
		label.label.is-large Изображения
	.field
		o-upload( v-model='files' multiple drag-drop rootClass="file is-boxed" )
			.file-cta
				.file-icon
					fa( icon="upload" )
				.file-label.has-text-centered Выберите файл(ы)...
	.field
		draggable.drag(
			v-if='files.length > 0'
			:list='files'
			handle=".drag")
			.wrapper.is-relative( v-for='(file, i) in files' :key='i' )
				.icons.is-absolute
					span.icon.is-small.has-text-white.drag
						fa( icon="arrows-up-down-left-right" size="xs" )
					span.icon.has-text-danger.remove( @click='remove(i)' )
						fa( icon="circle-xmark" )
				img( :src='u(file)' )
</template>

<script setup>
import { VueDraggableNext as draggable } from "vue-draggable-next"

import { useProgrammatic } from "@oruga-ui/oruga-next"
import { computed, ref, watch } from "vue"

const { oruga } = useProgrammatic()

const emit = defineEmits(["update:modelValue"])
const props = defineProps({ modelValue: Object })

const modelValue = computed(() => props.modelValue)
const files = ref(modelValue.value || [])

const u = file => file.lastModified ? URL.createObjectURL(file) : `/cars/${file.name}_480.webp`
const remove = i => files.value.splice(i, 1)

watch(() => [ ...files.value ], val => {
	if (files.value.length > 5) {
		oruga.notification.open({
			duration: 5000,
			message: "Максимально допустимо 5 изображений",
			position: 'bottom-right',
			variant: 'warning',
			closable: true
		})
		return files.value.length = 5
	}

	let hasInvalid = false

	for (let i in files.value) {
		const file = files.value[i]
		if (file.type && file.type !== "image/jpeg") {
			hasInvalid = true
			files.value.splice(i, 1)
		}
	}

	if (hasInvalid)
		oruga.notification.open({
			duration: 5000,
			message: "Допускаются только изображения <b>jpeg/jpg</b> формата",
			position: 'bottom-right',
			variant: 'warning',
			closable: true
		})

	emit("update:modelValue", val)
})
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/all";

.form {
	width: 100%;
}
.field {
	width: 100%;
	&:deep(.upload) {
		width: 100%;
		.upload-draggable,
		.file-cta {
			width: 100%;
		}
	}
}

.drag {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
	.wrapper {
		width: 32%;
		margin: 0 1% 1% 0;

		.icons {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			top: .25rem;
			right: .25rem;
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				&+.icon {
					margin-left: .25rem;
				}
				&.drag {
					background: $dark;
					cursor: grab;
					&:deep(svg) {
						font-size: .55rem;
					}
				}
				&.remove {
					cursor: pointer;
				}
			}
		}

		img {
			width: 100%;
		}
	}
}
</style>