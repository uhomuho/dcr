<script>
import chunk from 'lodash/chunk'
import { h } from "vue"

export default {
  props: {
    maxPerRow: {
      type: Number,
      default: 1
    }
  },
  methods: {
    renderAncestor(elements) {
      return h('div', { class: 'tile is-ancestor' }, elements.map((element) => {
        return h('div', { class: 'tile is-parent' }, [element])
      }))
    }
  },
  render() {
    const slots = this.$slots.default()
    if (this.$slots.default.length <= this.maxPerRow) {
      return this.renderAncestor(slots)
    } else {
      return h('div', { class: 'is-tiles-wrapper' }, chunk(slots, this.maxPerRow).map((group) => {
        return this.renderAncestor(group)
      }))
    }
  }
}
</script>
