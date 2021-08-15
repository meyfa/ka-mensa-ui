<template>
  <div class="choice">
    <label v-for="(optionLabel, optionKey) in options" :key="optionKey" class="choice-item">
      <input type="radio" class="choice-input" :checked="modelValue === optionKey"
          @change="$emit('update:modelValue', optionKey)" />
      <span class="choice-box"></span>
      {{ optionLabel }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue']
}
</script>

<style scoped>
.choice-item {
  display: block;
  margin: 2px 0;
  padding: 2px 0;
}

.choice-input {
  position: absolute;
  opacity: 0;
}

.choice-box {
  display: inline-block;
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  margin: 0 4px 0 0;
  border: 1px solid var(--color-text-lighter);
  border-radius: 50%;
}

.choice-item:hover .choice-box,
.choice-input:checked + .choice-box {
  border-color: var(--color-text);
}

.choice-input:focus + .choice-box {
  outline: 1px dotted var(--color-text);
  outline-offset: 2px;
}

.choice-box::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.choice-input:checked + .choice-box::after {
  background: var(--color-text);
}
</style>
