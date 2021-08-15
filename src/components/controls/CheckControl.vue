<template>
  <label class="check">
    <input type="checkbox" class="check-input" :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)">
    <span class="check-box" />
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.check {
  display: block;
  margin: 4px 0;
  padding: 2px 0;
}

.check-input {
  position: absolute;
  opacity: 0;
}

.check-box {
  display: inline-block;
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  margin: 0 4px 0 0;
  border: 1px solid var(--color-text-lighter);
}

.check:hover .check-box,
.check-input:checked + .check-box {
  border: 2px solid var(--color-text);
}

.check-input:focus + .check-box {
  outline: 1px dotted var(--color-text);
  outline-offset: 4px;
}

.check:hover .check-input:checked + .check-box {
  border-color: var(--color-text-lighter);
}

.check-box::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 9px;
  height: 5px;
  color: transparent;
  border-left: 2px solid;
  border-bottom: 2px solid;
  transform: translate(-50%, -50%) rotate(-45deg);
}

.check-input:checked + .check-box::after {
  color: var(--color-text);
}

.check:hover .check-input:checked + .check-box::after {
  color: var(--color-text-lighter);
}
</style>
