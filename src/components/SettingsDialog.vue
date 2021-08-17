<template>
  <DialogBase title="Optionen" size="full"
      :visible="visible" @close="$emit('update:visible', false)">
    <div class="columns">
      <div class="column">
        <div class="column-title">Mensen</div>
        <CanteensSettings />
      </div>

      <div class="column">
        <div class="column-title">Filter</div>
        <FilterSettings />
      </div>

      <div class="column">
        <div class="column-title">Darstellung</div>
        <AppearanceSettings />
      </div>
    </div>
  </DialogBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DialogBase from './DialogBase.vue'

import CanteensSettings from './settings/CanteensSettings.vue'
import FilterSettings from './settings/FilterSettings.vue'
import AppearanceSettings from './settings/AppearanceSettings.vue'

export default defineComponent({
  components: {
    DialogBase,
    CanteensSettings,
    FilterSettings,
    AppearanceSettings
  },

  props: {
    visible: {
      type: Boolean
    }
  },

  emits: ['update:visible']
})
</script>

<style scoped>
.columns {
  display: flex;
  flex-wrap: wrap;
}

.column {
  display: inline-block;
  width: 320px;
  max-width: 480px;
  flex-grow: 1;
  margin: 0 32px 32px 0;
}

.column-title {
  margin: 16px 0;
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 720px) {
  .columns {
    display: block;
    padding: 8px 16px 0;
  }

  .column {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 0 0 32px;
  }
}
</style>
