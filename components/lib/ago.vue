<template>
  <p class="timeago">
    {{ formated }}
  </p>
</template>

<script>
import { format, register } from 'timeago.js'
export default {
  props: {
    time: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formated: '',
      interval: null
    }
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  mounted () {
    this.format()
    this.interval = setInterval(() => {
      this.format()
    }, 60000)
  },
  beforeCreate () {
    const localeFunc = (number, index, totalSec) => {
      return [
        ['baru saja', 'sekarang'],
        ['%s detik yang lalu', 'dalam %s detik'],
        ['1 menit yang lalu', 'dalam 1 menit'],
        ['%s menit yang lalu', 'dalam %s menit'],
        ['1 jam yang lalu', 'dalam 1 jam'],
        ['%s jam yang lalu', 'dalam %s jam'],
        ['1 hari yang lalu', 'dalam 1 hari'],
        ['%s hari yang lalu', 'dalam %s hari'],
        ['1 minggu yang lalu', 'dalam 1 minggu'],
        ['%s minggu yang lalu', 'dalam %s minggu'],
        ['1 bulan yang lalu', 'dalam 1 bulan'],
        ['%s bulan yang lalu', 'dalam %s bulan'],
        ['1 tahun yang lalu', 'dalam 1 tahun'],
        ['%s tahun yang lalu', 'dalam %s tahun']
      ][index]
    }
    // register your locale with timeago
    register('id_ID', localeFunc)
  },
  methods: {
    format () {
      this.formated = format(this.time, 'id_ID')
    }
  }
}
</script>
