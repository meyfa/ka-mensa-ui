<template>
  <div ref="container" class="container">
    <div class="panel" :class="{ sticky }">
      <button type="button" class="dir-btn" @click="$emit('previous')">❮</button>
      <h2 class="date">{{ date | date }}</h2>
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
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.dir-btn {
  display: inline-block;
  width: 32px;
  height: 32px;
  font: inherit;
  line-height: 32px;
  font-size: 16px;
  font-weight: bold;
  margin: 0 16px;
  padding: 0;
  background: none;
  border: 1px solid #888;
  border-radius: 50%;
  color: #888;
  outline: none;
  cursor: pointer;
}

.dir-btn:focus,
.dir-btn:hover {
  border: 2px solid #000;
  color: #000;
}
</style>
