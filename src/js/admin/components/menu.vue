<template lang="pug">
.menu.is-flex.is-align-items-center.is-justify-content-flex-start
	MenuItem( 
		v-for='({ icon, name, text }, i) in menu' :key='i'
		:icon='icon' :name='name') {{ text }}
</template>

<script setup>
import MenuItem from "@c/menu_item.vue"

const menu = [
	{ icon: "car", name: "Cars", text: "Автомобили" },
	{ icon: "copyright", name: "Brands", text: "Бренды" },
	{ icon: "user", name: "Members", text: "Клиенты" }
]
</script>