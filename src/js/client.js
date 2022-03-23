import { createApp } from "vue"

import tpl from "@/client.vue"

const app = createApp(tpl)

import dayjs from "dayjs"
app.provide("dayjs", dayjs)

import VueLazyLoad from "vue3-lazyload"
app.use( VueLazyLoad )

import router from "@/router"
app.use( router )

import pinia from "@/store"
app.use( pinia )

import { useLocaleStore } from "@/store/locale"
const localeStore = useLocaleStore()

import { i18n } from "@/i18n"
localeStore.$i18n = i18n.global

import "@/fontawesome/lib"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
app.component('fa', FontAwesomeIcon)

import Container from "@c/container.vue"
app.component('container', Container)

app.provide("isMobile", /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))


app.mount("#client")