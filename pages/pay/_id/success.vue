<template>
  <div class="flex items-center justify-center h-screen flex-col">
    <h1 class="text-4xl font-bold">
      🤗 Terima Kasih!
    </h1>
    <p>Pembayaran kamu akan segera divalidasi oleh sistem!</p>
    <nuxt-link to="/" class="font-bold p-5 text-blue-600">
      Kembali ke beranda
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    donation () {
      return this.$store.state.donation.data
    }
  },
  mounted () {
    if (!this.donation) {
      return this.$router.replace(`/pay/${this.$route.params.id}`)
    }
  }
}
</script>
