<template lang="pug">
footer#footer.hero-foot
	.section
		.container
			.columns.is-flex.is-multiline
				.column.is-3-desktop.is-6-tablet.is-12-mobile
					.column-container.is-flex.is-align-items-center.is-justify-flex-start
						img( v-lazy='"/img/footer_logo.webp"' )
				.column.is-3-desktop.is-6-tablet.is-12-mobile
				.column.is-3-desktop.is-6-tablet.is-12-mobile
					.column-container.is-flex.is-align-items-center.is-justify-flex-end
						.content
							p {{ t("footer.questions") }}
							a( href="mailto:hello@dcr-motors.com" ) hello@dcr-motors.com
				.column.is-3-desktop.is-6-tablet.is-12-mobile
					.column-container.is-flex.is-align-items-center.is-justify-flex-end
						.socials
							p {{ t("footer.socials") }}
							.icons.is-flex.is-justify-content-flex-end
								a.is-flex.is-align-items-center.is-justify-content-center(
									v-for='({ icon, link }, i) in socials' :key='i'
									:href='link' target="_blank" )
									span.icon.is-medium
										fa( :icon='["fab", icon]' )
			hr
			.level
				.level-left
					.level-item
						p 2021 — {{ dayjs().format("YYYY") }} &copy; DCR Motors
				.level-right
					.level-item.has-text-right
						router-link( :to='{ name: to("Privacy") }' ) {{ t("footer.privacy") }}
</template>

<script setup>
import { computed, inject } from "vue";
import { useLocaleStore } from "@/store/locale"

const ls = useLocaleStore()

const dayjs = inject("dayjs")

const to = computed(() => ls.to)
const t = ls.translate
const socials = [
	{ link: '//instagram.com/dcr_motors', icon: 'instagram' },
	{ link: '//t.me/dcr_motors', icon: 'telegram-plane' },
	{ link: '//pinterest.com/dcr_motors', icon: 'pinterest-p' }
]
</script>