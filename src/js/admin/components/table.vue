<template lang="pug">
.b-table.is-relative( :class='{ "is-loading": pending }' )
	.form.mb-2
		.field.is-grouped
			.control
				.select
					select( v-model='store.limit' )
						option 25
						option 50
						option 100
			.control
				input.input( v-model='store.keyword' placeholder="Поиск..." )
	Pagination( :total='store.total' :limit='store.limit' :current='store.page' @switchPage='store.page = $event' )
	.table-wrapper.has-mobile-cards.is-relative
		table.table.is-fullwidth.is-striped.is-fullwidth( :class='{ "is-hoverable": !noData }' )
			thead
				tr
					th( v-for='({ label }, i) in columns' :key='i' ) {{ label }}
					th( v-if='route || deletable' )
			tbody
				template( v-if='noData' )
					tr.is-empty
						td( :colspan='columns.length + (pending && deletable ? 2 : pending || deletable ? 1 : 0)' )
							.content.has-text-grey.has-text-centered.pt-4
								p
									span.icon.is-large
										fa( icon="face-frown" size="3x" )
								p.has-text-weight-bold Нет данных...
				template( v-else )
					tr( v-for='(item, i) in data' :key='i' )

						td( 
							v-for='({ field, type, format, label }, y) in columns' :key='y'
							:data-label='label')
							template( v-if='item[field]' )
								img( v-if='type && type === "img"' :src='`${item[field]}`' )
								.field.check( v-else-if='type && type == "checkbox"' )
									input.is-checkradio.is-link.is-medium( :id='`check_${item.id}`' type="checkbox" v-model='item[field]' @input='$emit("changed", { field, val: $event.target.value })' )
									label( :for='`check_${item.id}`' )
								span( v-else ) {{ `${item[field]}${format || ""}` || "—" }}

						td.btns( v-if='route || deletable' )
							.buttons.is-pulled-right
								router-link.button.is-link.is-small( 
									v-if='route'
									:to='{ name: route, params: { id: item.id } }' )
									span.icon.is-large
										fa( icon="arrow-right" size="lg" )
								.button.is-danger.is-small( 
									v-if='deletable'
									@click='onDelete = item' )
									span.icon.is-large
										fa( icon="trash" size="lg" )
	Pagination( :total='store.total' :limit='store.limit' :current='store.page' @switchPage='store.page = $event' )
	Modal( :active='!!onDelete' :name='onDelete?.name' @confirm='remove' @decline='onDelete = null' )
</template>

<script setup>
import Pagination from "@c/pagination.vue"
import Modal from "@c/modal_on_delete.vue"

import { computed, ref } from "vue"

const props = defineProps({
	columns: Array,
	data: Array,
	route: String,
	deletable: Boolean,
	pending: Boolean,
	store: Object
})
defineEmits([ "onDelete", "changed" ])

const data = computed(() => props.data)
const pending = computed(() => props.pending)
const noData = computed(() => !data.value || !data.value.length)
const store = computed(() => props.store)
const onDelete = ref(null)

const remove = () => {
	onDelete.value = null
	store.remove(item.id)
}
</script>

<style lang="scss" scoped>
@import "bulma-responsive-tables/bulma-responsive-tables";
.b-table.is-loading:after {
	margin: auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

td {
	vertical-align: middle;
	img {
		max-height: 4rem;
	}

	@media screen and (max-width: 768px) {
		&.btns {
			.buttons {
				width: 100%;
				.button {
					flex: 1;
				}
			}
			&::before {
				display: none;
			}
		}
	}
}

.field {
	&.is-grouped {
		.control {
			flex: unset;
		}
	}
	&.check {
		label {
			margin: 0;
			padding: 0 1rem;
		}
	}
}
</style>