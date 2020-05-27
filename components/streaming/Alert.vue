<template>
  <div class="alert bg-transparent">
    <h1 class="alert-title alert-text text-6xl text-white text-center">
      <span class="text-green-400">Rp. {{ amount.toLocaleString() }}</span> dari <span class="text-green-400">{{ name }}</span>
    </h1>
    <p class="alert-text text-4xl text-center font-extrabold text-white">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: false,
      default: ''
    },
    amount: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    timeout: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data () {
    return {
      interval: null
    }
  },
  mounted () {
    console.log('Alert:mounted')
    this.interval = setTimeout(() => {
      this.$emit('finish')
    }, this.timeout * 1000)
  },
  beforeDestroy () {
    if (this.interval) {
      clearTimeout(this.interval)
    }
  }
}
</script>

<style scoped>
.alert-title {
  font-weight: 900 !important;
}

.alert-text {
text-shadow: 0 0 6px #000;
}
</style>
