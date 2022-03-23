<template lang="pug">
.card-header
	p.card-header-title Войти
.card-content
	form.form( @submit.prevent='auth()' )
		o-field( label="Логин" )
			o-input( v-model='data.username' )
		o-field( label="Пароль" )
			o-input( v-model='data.password' type="password" )
		o-field
			button.button.is-primary Войти
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from "@/store/user"
import { useProgrammatic } from "@oruga-ui/oruga-next"
import { useRouter } from "vue-router"

const $router = useRouter()
const us = useUserStore()
const { oruga } = useProgrammatic()

if (us.user)
	$router.replace({ name: "Dashboard" })

const data = ref({})
const auth = () => {
	return us.auth(data.value)
		.then(() => $router.push({ name: "Dashboard" }))
		.catch(err => {
			oruga.notification.open({
				duration: 5000,
				message: `<b>${err.status}:</b> ${err.message}`,
				position: 'bottom-right',
				variant: 'danger',
				closable: true
			})
		})
}
</script>