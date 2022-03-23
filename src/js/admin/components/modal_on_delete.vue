<template lang="pug">
.modal.is-active( v-if='active' )
	.modal-background( @click='emit("decline")' )
	.modal-content.px-1
		.box
			.content
				p.is-size-5
					|Вы уверены, что хотите удалить&nbsp;
					b {{ name }}
					|?
			.buttons
				.button.is-success( @click='emit("confirm")' )
					fa( icon="check" )
				.button.is-danger( @click='emit("decline")' )
					fa( icon="xmark" )
	button.modal-close.is-large( @click='emit("decline")' )
</template>

<script setup>
const props = defineProps({ active: Boolean, name: String })
const emit = defineEmits([ "confirm", "decline" ])
</script>

<style lang="scss" scoped>
.modal-content {
	max-width: 640px;
}

.buttons {
	.button {
		flex: 1;
	}
}
</style>