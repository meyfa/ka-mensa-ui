<template>
  <transition name="fadein">
    <div v-if="meal" class="outer" @click.self="close()">
      <div class="inner">
        <h2 class="title">Meal Information</h2>
        <button type="button" class="close-btn" @click="close()">✖</button>

        <div class="content">
          <div class="name">
            {{ meal.name }}
          </div>
          <div v-if="meal.price" class="price">
            Price: {{ meal.price }}
          </div>
          <div class="classifiers">
            <div v-for="classifier in classifiersAndAdditives" :key="classifier"
                class="classifiers-item">
              ({{ classifier }}) {{ legend ? legend[classifier] : '' }}
            </div>
          </div>

          <div class="content-trailer"></div>
        </div>
      </div>

      <prevent-global-scrolling></prevent-global-scrolling>
      <keydown-listener :keys="closeKeys" @triggered="close()"></keydown-listener>
    </div>
  </transition>
</template>

<script>
import api from '~/api'

import PreventGlobalScrolling from '~/components/functional/PreventGlobalScrolling'
import KeydownListener from '~/components/functional/KeydownListener'

const ESCAPE_KEY = 27

export default {
  components: {
    PreventGlobalScrolling,
    KeydownListener
  },

  props: {
    meal: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      closeKeys: [ESCAPE_KEY],
      legend: null
    }
  },

  computed: {
    classifiersAndAdditives () {
      return [...new Set([...this.meal.classifiers, ...this.meal.additives])]
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      let data
      try {
        data = await api.getLegend()
      } catch (e) {
        this.legend = null
        return
      }
      this.legend = {}
      for (const { short, label } of data) {
        this.legend[short] = label
      }
    },

    close () {
      this.$emit('update:meal', null)
    }
  }
}
</script>

<style scoped>
.fadein-enter-active,
.fadein-leave-active {
  transition: all 0.3s;
}

.fadein-enter,
.fadein-leave-to {
  opacity: 0;
}

.outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding: 24px;
  background: var(--color-dialog-veil);
}

.inner {
  background: var(--color-dialog-background);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 50vh;
  min-width: 320px;
  min-height: 320px;
  max-width: 480px;
  max-height: 480px;
  border: 1px solid var(--color-divider);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
}

.fadein-enter-active > .inner,
.fadein-leave-active > .inner {
  transition: all 0.2s 0.1s;
}

.fadein-enter > .inner,
.fadein-leave-to > .inner {
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0;
}

.title {
  height: 53px;
  font-size: 24px;
  line-height: 50px;
  margin: 0;
  padding: 0 24px;
  border-bottom: 3px solid var(--color-divider);
}

.close-btn {
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 16px;
  margin: 0;
  padding: 8px 12px;
  font: inherit;
  font-size: 20px;
  line-height: 1;
  background: none;
  color: inherit;
  border: 1px solid transparent;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.close-btn:focus,
.close-btn:hover {
  background: var(--color-button-background);
  border-color: var(--color-button-border);
}

.content {
  height: calc(100% - 50px - 4px);
  padding: 16px 24px 0;
  overflow-y: scroll;
}

.name {
  font-weight: bold;
}

.price {
  margin: 8px 0;
  font-weight: bold;
}

.classifiers {
  margin: 16px 0 0;
}

.classifiers-item {
  margin: 4px 0;
}

.content-trailer {
  height: 16px;
}

@media (max-width: 480px) {
  .inner {
    width: calc(100% - 32px);
  }

  .title {
    padding: 0 16px;
  }

  .close-btn {
    right: 8px;
  }
}
</style>
