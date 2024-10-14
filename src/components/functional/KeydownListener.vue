<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import type { PropType } from 'vue'

const EVENT_NAME = 'keydown'

export default defineComponent({
  props: {
    keys: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },

  emits: ['triggered'],

  setup (props, { emit }) {
    const handleEvent = (event: KeyboardEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (props.keys == null || props.keys.length === 0 || props.keys.includes(event.key)) {
        event.preventDefault()
        emit('triggered', event)
      }
    }

    onMounted(() => window.addEventListener(EVENT_NAME, handleEvent))
    onUnmounted(() => window.removeEventListener(EVENT_NAME, handleEvent))

    // do not render anything
    return () => null
  }
})
</script>
