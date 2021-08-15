<script>
const EVENT_NAME = 'keydown'

export default {
  props: {
    keys: {
      type: Array,
      default: null
    }
  },

  emits: ['triggered'],

  mounted () {
    window.addEventListener(EVENT_NAME, this.handleEvent)
  },

  unmounted () {
    window.removeEventListener(EVENT_NAME, this.handleEvent)
  },

  methods: {
    handleEvent (event) {
      if (!this.keys || !this.keys.length || this.keys.includes(event.keyCode)) {
        event.preventDefault()
        this.$emit('triggered', event)
      }
    }
  },

  render () {
    return null
  }
}
</script>
