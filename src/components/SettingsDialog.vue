<template>
  <dialog-base title="Optionen" size="full"
      :visible="visible" @close="$emit('update:visible', false)">
    <div class="columns">
      <div class="column">
        <div class="column-title">Mensen</div>
        <canteens-settings></canteens-settings>
      </div>

      <div class="column">
        <div class="column-title">Filter</div>
        <filter-settings></filter-settings>
      </div>

      <div class="column">
        <div class="column-title">Darstellung</div>
        <appearance-settings></appearance-settings>
      </div>
    </div>
  </dialog-base>
</template>

<script>
import DialogBase from '~/components/DialogBase'

import CanteensSettings from '~/components/settings/CanteensSettings'
import FilterSettings from '~/components/settings/FilterSettings'
import AppearanceSettings from '~/components/settings/AppearanceSettings'

export default {
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
  }
}
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
