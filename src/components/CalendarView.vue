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
      <tr class="cal-head-row">
        <th v-for="weekday in weekdays" :key="weekday">{{ weekday }}</th>
      </tr>
      <tr v-for="(row, rowIndex) in rows" :key="'row' + rowIndex" class="cal-row">
        <td v-for="(col, colIndex) in row" :key="'col' + colIndex">
          <button v-if="col" class="cal-btn" :class="{ current: col.current }"
              :disabled="!col.enabled" @click="clickDate(col.day)">
            {{ col.day }}
          </button>
          <span v-else class="cal-dummy"></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    dates: {
      type: Array,
      default: () => []
    },
    current: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      year: 0,
      month: 0
    }
  },

  computed: {
    weekdays () {
      return moment.weekdaysMin(true)
    },

    formattedMonth () {
      return moment([this.year, this.month]).format('MMMM')
    },

    hasPreviousMonth () {
      return this.dates.some(({ year, month }) => {
        return year < this.year || (year === this.year && month < this.month)
      })
    },

    hasNextMonth () {
      return this.dates.some(({ year, month }) => {
        return year > this.year || (year === this.year && month > this.month)
      })
    },

    rows () {
      const current = this.current ? moment(this.current) : moment()
      const first = moment([this.year, this.month])
      const last = first.clone().endOf('month')

      const allDays = []

      // skip days not part of current month
      for (let i = 1; i < first.isoWeekday(); ++i) {
        allDays.push(null)
      }

      // add days of month
      for (let dayNumber = 1, n = last.date(); dayNumber <= n; ++dayNumber) {
        const date = moment([this.year, this.month, dayNumber])
        allDays.push({
          day: dayNumber,
          enabled: this.dates.some(item => date.isSame(moment(item), 'day')),
          current: date.isSame(current, 'day')
        })
      }

      const rows = []
      for (let i = 0; i < allDays.length; i += 7) {
        const cols = allDays.slice(i, i + 7)
        // ensure correct length
        while (cols.length < 7) cols.push(null)
        rows.push(cols)
      }

      // add dummy rows to get up to 6, which is the max possible,
      // to prevent layout shifting
      while (rows.length < 6) {
        rows.push(new Array(7).fill(null))
      }

      return rows
    }
  },

  created () {
    const current = this.current ? moment(this.current) : moment()
    this.year = current.year()
    this.month = current.month()
  },

  methods: {
    clickDate (day) {
      this.$emit('select', { year: this.year, month: this.month, day })
    },

    previousMonth () {
      --this.month
      if (this.month < 0) {
        this.month = 11
        --this.year
      }
    },

    nextMonth () {
      ++this.month
      if (this.month > 11) {
        this.month = 0
        ++this.year
      }
    }
  }
}
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
