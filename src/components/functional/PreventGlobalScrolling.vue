<script lang="ts">
// global counter for the number of prevent requests active (to allow for layered dialogs etc.)
import { defineComponent, onMounted, onUnmounted } from 'vue'

let preventCount = 0

/**
 * Increment the prevention counter.
 */
function increment (): void {
  ++preventCount
  // if this is the first instance, activate prevention
  if (preventCount === 1) {
    const previousBodyWidth = document.body.offsetWidth
    document.documentElement.style.overflowY = 'hidden'
    // adjust body padding to remove 'jumping' because of hidden scrollbar
    const scrollbarWidth = document.body.offsetWidth - previousBodyWidth
    document.body.style.paddingRight = scrollbarWidth + 'px'
  }
}

/**
 * Decrement the prevention counter. If it reaches 0, scrolling will be allowed again.
 */
function decrement (): void {
  --preventCount
  // if this was the last instance, deactivate prevention
  if (preventCount === 0) {
    document.documentElement.style.overflowY = ''
    document.body.style.paddingRight = ''
  }
}

export default defineComponent({
  setup () {
    onMounted(() => increment())
    onUnmounted(() => decrement())

    // do not render anything
    return () => null
  }
})
</script>
