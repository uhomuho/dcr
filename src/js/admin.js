import { createApp } from "vue"

import "@/assets/scss/bulma.scss"

import tpl from "@/admin.vue"

const app = createApp(tpl)

import router from "@/router"
app.use( router )

import Oruga from "@oruga-ui/oruga-next"
import { bulmaConfig } from "@oruga-ui/theme-bulma"
app.use( Oruga, bulmaConfig )

import pinia from "@/store"
app.use( pinia )


app.provide("isMobile", /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

import "@/fontawesome/lib"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
app.component('fa', FontAwesomeIcon)

app.mount("#admin")