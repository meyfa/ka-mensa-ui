<template>
  <div ref="container" class="container">
    <div class="panel" :class="{ sticky }">
      <h2 class="date">{{ date | date }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sticky: false
    }
  },

  mounted () {
    this.recomputeSticky()
    window.addEventListener('scroll', this.recomputeSticky)
  },

  destroyed () {
    window.removeEventListener('scroll', this.recomputeSticky)
  },

  methods: {
    recomputeSticky () {
      this.sticky = this.$refs.container.getBoundingClientRect().top < 0
    }
  }
}
</script>

<style scoped>
.container {
  height: 50px;
  line-height: 50px;
  margin: 0 0 24px;
}

.panel {
  width: 100%;
  transition: background 0.1s;
}

.panel.sticky {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: #fffbfb;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.3);
}

.date {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>
