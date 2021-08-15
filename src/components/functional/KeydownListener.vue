<script>
import { onMounted, onUnmounted } from 'vue'

const EVENT_NAME = 'keydown'

export default {
  props: {
    keys: {
      type: Array,
      default: null
    }
  },

  emits: ['triggered'],

  setup (props, { emit }) {
    const handleEvent = (event) => {
      if (!props.keys || !props.keys.length || props.keys.includes(event.keyCode)) {
        event.preventDefault()
        emit('triggered', event)
      }
    }

    onMounted(() => window.addEventListener(EVENT_NAME, handleEvent))
    onUnmounted(() => window.removeEventListener(EVENT_NAME, handleEvent))

    // do not render anything
    return () => null
  }
}
</script>
