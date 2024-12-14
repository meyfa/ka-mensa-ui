<template>
  <div>
    <div class="month">
      <button class="month-btn" :disabled="!hasPreviousMonth" @click="previousMonth">
        ❮
      </button>
      <span class="month-label">{{ formattedMonth }} {{ year }}</span>
      <button class="month-btn" :disabled="!hasNextMonth" @click="nextMonth">
        ❯
      </button>
    </div>

    <table class="calendar">
      <thead>
        <tr class="cal-head-row">
          <th v-for="weekday in weekdays" :key="weekday">{{ weekday }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="'row' + rowIndex" class="cal-row">
          <td v-for="(col, colIndex) in row" :key="'col' + colIndex">
            <button
                v-if="col" class="cal-btn" :class="{ current: col.current }"
                :disabled="!col.enabled" @click="clickDate(col.day)">
              {{ col.day }}
            </button>
            <span v-else class="cal-dummy" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import moment from 'moment'
import type { PropType } from 'vue'
import type { DateSpec } from '../types/date-spec.js'
import { fromMoment, getCurrentDate, isEqualDate } from '../util/date.js'

export default defineComponent({
  props: {
    dates: {
      type: Array as PropType<DateSpec[]>,
      default: () => []
    },
    current: {
      type: Object as PropType<DateSpec | undefined | null>,
      default: null
    }
  },

  emits: ['select'],

  setup (props, { emit }) {
    const current = props.current ?? getCurrentDate()
    const year = ref(current.year)
    const month = ref(current.month)

    const formattedMonth = computed(() => moment([year.value, month.value]).format('MMMM'))

    const hasPreviousMonth = computed(() => {
      return props.dates.some((date) => {
        return date.year < year.value || (date.year === year.value && date.month < month.value)
      })
    })

    const hasNextMonth = computed(() => {
      return props.dates.some((date) => {
        return date.year > year.value || (date.year === year.value && date.month > month.value)
      })
    })

    const rows = computed(() => {
      // a calendar should always contain exactly 6 rows with 7 days each
      const rows = new Array(6).fill(null).map(() => new Array(7).fill(null))

      const start = moment([year.value, month.value])
      const offset = start.isoWeekday() - 1

      const cursor = fromMoment(start)
      while (cursor.day <= start.daysInMonth()) {
        const position = offset + cursor.day - 1
        rows[Math.trunc(position / 7)][position % 7] = {
          day: cursor.day,
          enabled: props.dates.some((item) => isEqualDate(item, cursor)),
          current: isEqualDate(current, cursor)
        }
        ++cursor.day
      }

      return rows
    })

    const clickDate = (day: number) => {
      emit('select', { year: year.value, month: month.value, day })
    }

    const previousMonth = () => {
      --month.value
      if (month.value < 0) {
        month.value = 11
        --year.value
      }
    }

    const nextMonth = () => {
      ++month.value
      if (month.value > 11) {
        month.value = 0
        ++year.value
      }
    }

    return {
      year,
      formattedMonth,
      hasPreviousMonth,
      hasNextMonth,
      rows,
      clickDate,
      previousMonth,
      nextMonth,
      weekdays: moment.weekdaysMin(true)
    }
  }
})
</script>

<style scoped>
.month {
  position: relative;
  margin: 0 0 8px;
  font-size: 0;
  text-align: center;
}

.month-label {
  display: inline-block;
  width: 70%;
  font-size: 20px;
}

.month-btn {
  width: 12%;
  height: 28px;
  padding: 0;
  font: inherit;
  font-size: 20px;
  color: var(--color-text);
  line-height: 1;
  background: var(--color-button-background);
  border: 1px solid var(--color-button-border);
  border-radius: 2px;
  cursor: pointer;
}

.month-btn:disabled {
  background: none;
  color: var(--color-text-lighter);
  cursor: default;
}

.calendar {
  width: 100%;
  margin: 12px 0;
  border-collapse: collapse;
}

.cal-head-row {
  border-top: 2px solid var(--color-text-lighter);
  border-bottom: 2px solid var(--color-text-lighter);
}

.cal-head-row > th {
  font-weight: bold;
  line-height: 2.5;
  text-align: center;
}

.cal-row {
  border-bottom: 1px solid var(--color-divider);
}

.cal-row > td {
  line-height: 1;
}

.cal-dummy,
.cal-btn {
  display: block;
  width: 40px;
  height: 32px;
  margin: 6px auto;
}

.cal-btn {
  padding: 0;
  background: var(--color-date-available);
  border: 2px solid transparent;
  border-radius: 16px;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

.cal-btn:focus,
.cal-btn:hover {
  border-color: var(--color-text);
}

.cal-btn:disabled {
  background: none;
  cursor: default;
}

.cal-btn:disabled:focus,
.cal-btn:disabled:hover {
  border-color: transparent;
}

.cal-btn.current {
  background: var(--color-date-current);
  color: var(--color-date-current-text);
  font-weight: bold;
}
</style>
