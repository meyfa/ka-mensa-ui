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
      if (!props.keys || !props.keys.length || props.keys.includes(event.key)) {
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
