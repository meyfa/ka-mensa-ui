<template>
  <transition name="fadein">
    <div v-if="visible" class="outer" :class="'size-' + size" @click.self="close()">
      <div class="inner">
        <h2 class="title">{{ title }}</h2>
        <button type="button" class="close-btn" @click="close()">✖</button>

        <div class="content">
          <slot></slot>

          <div class="content-trailer"></div>
        </div>
      </div>

      <prevent-global-scrolling></prevent-global-scrolling>
      <keydown-listener :keys="closeKeys" @triggered="close()"></keydown-listener>
    </div>
  </transition>
</template>

<script>
import PreventGlobalScrolling from '~/components/functional/PreventGlobalScrolling'
import KeydownListener from '~/components/functional/KeydownListener'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

const SIZE_OPTIONS = ['default', 'full', 'grow']

export default {
  components: {
    PreventGlobalScrolling,
    KeydownListener
  },

  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String,
      default: 'Information'
    },
    size: {
      type: String,
      default: SIZE_OPTIONS[0],
      validator: (value) => SIZE_OPTIONS.includes(value)
    }
  },

  data () {
    return {
      closeKeys: [ESCAPE_KEY, ENTER_KEY]
    }
  },

  methods: {
    close () {
      this.$emit('close', false)
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

.size-full .inner {
  width: 80vw;
  height: 90vh;
  max-width: 1600px;
  max-height: 1600px;
}

.size-grow .inner {
  height: auto;
  min-height: 150px;
  max-height: 1600px;
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

.size-grow .content {
  height: auto;
  max-height: calc(90vh - 50px - 4px);
}

.content-trailer {
  display: block;
  width: 100%;
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

  .content {
    padding: 8px 16px 0;
  }
}

@media (max-width: 720px) {
  .size-full .inner {
    width: calc(100% - 32px);
  }

  .size-full .title {
    padding: 0 16px;
  }

  .size-full .close-btn {
    right: 8px;
  }

  .size-full .content {
    padding: 8px 16px 0;
  }
}
</style>
