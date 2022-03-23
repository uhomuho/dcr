<template lang="pug">
Header( v-if='user' )
.hero-body.is-justify-content-ceneter.is-align-items-stretch( v-if='user' )
	.section
		.container
			Tabs
			.box
				router-view
	
.hero-body.is-justify-content-center.is-align-items-center( v-else )
	.px-4
		.card
			router-view
</template>

<script setup>
import Header from "@c/header.vue"
import Tabs from "@c/tabs.vue"

import { computed } from "vue"
import { useUserStore } from "@/store/user"

const us = useUserStore()
await us.authByToken()

const user = computed(() => us.user)
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/all";

.section {
	padding: 1rem 3rem;
}

.box {
	max-height: calc(100% - 41px);
}
.container {
	height: 100%;

	&:deep(.tabs) {
		&+.box {
			border-radius: 0 0 6px 6px;
		}
	}
}
.box {
	padding-right: 1.25rem;

	overflow-y: scroll;
	scrollbar-color: #{$primary} transparent;
	scrollbar-width: thin;
	&::-webkit-scrollbar {
		height: .25rem;
		width: .25rem;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba($primary, .5);
		cursor: pointer;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: rgba($primary, .7);
	}
}
</style>

<style lang="scss">
.section {
	width: 100%;
}
.container {
	width: 100%;
}
.hero-body {
	padding: 0;
}

.is-absolute {
	position: absolute;
}

.field.has-addons {
	position: relative;
	.help {
		margin-top: 0;
		position: absolute;
		top: 100%;
		left: 0;
	}
}

.input {
	&:focus, &:hover {
		z-index: 1!important;
	}
}

.label.on-border {
	font-size: 0.75rem;
	padding: 0 .125rem;
	margin-bottom: 0;
	position: absolute;
	top: calc(-.75rem * .75 - 2px);
	left: calc(0.75em - 1px);
	z-index: 2;
	&::before {
		display: block;
		content: "";
		width: 100%;
		height: 5px;
		margin: auto;
		background: #fff;
		position: absolute;
		top: 2px;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
}
</style>
