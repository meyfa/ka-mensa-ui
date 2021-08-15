<script>
// global counter for the number of prevent requests active (to allow for layered dialogs etc.)
let preventCount = 0

export default {
  props: {
    keys: {
      type: Array,
      default: null
    }
  },

  mounted () {
    this.increment()
  },

  unmounted () {
    this.decrement()
  },

  methods: {
    increment () {
      ++preventCount
      // if this is the first instance, activate prevention
      if (preventCount === 1) {
        const previousBodyWidth = document.body.offsetWidth
        document.documentElement.style.overflowY = 'hidden'
        // adjust body padding to remove 'jumping' because of hidden scrollbar
        const scrollbarWidth = document.body.offsetWidth - previousBodyWidth
        document.body.style.paddingRight = scrollbarWidth + 'px'
      }
    },

    decrement () {
      --preventCount
      // if this was the last instance, deactivate prevention
      if (preventCount === 0) {
        document.documentElement.style.overflowY = ''
        document.body.style.paddingRight = ''
      }
    }
  },

  render () {
    return null
  }
}
</script>
