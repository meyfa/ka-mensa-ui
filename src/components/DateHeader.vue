<template>
  <div ref="container" class="container">
    <div class="panel" :class="{ sticky }">
      <button type="button" class="dir-btn" @click="$emit('previous')">❮</button>
      <div class="date">
        <h2 class="date-title">{{ date | date }}</h2>
        <div class="date-subtitle">{{ date | daysAgo }}</div>
      </div>
      <button type="button" class="dir-btn" @click="$emit('next')">❯</button>
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
  text-align: center;
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
  display: inline-block;
  min-width: 150px;
  margin: 0 20px;
  line-height: 1;
  vertical-align: middle;
}

.date-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.date-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  font-weight: bold;
}

.dir-btn {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  font: inherit;
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  background: none;
  border: 2px solid transparent;
  border-radius: 50%;
  color: #666;
  outline: none;
  cursor: pointer;
}

.dir-btn:focus,
.dir-btn:hover {
  border-color: #000;
  color: #000;
}
</style>
