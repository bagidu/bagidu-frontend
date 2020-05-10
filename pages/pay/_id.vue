<template>
  <div id="donate" class="bg-white h-screen">
    <div id="container" class="md:w-1/4  m-auto bg-white flex flex-col items-center justify-center">
      <div id="qr" class="flex items-center justify-center flex-col">
        <img v-if="qrURL" :src="qrURL" alt="">
        <img src="@/assets/images/qris.png" alt="qris logo" class="w-20 ">
        <div id="description" class="text-xs">
          Bayar menggunakan eWallet yang mendukung QRIS seperti GoPay,OVO,LinkAja,Dana
        </div>
      </div>
      <a
        class="px-3 py-1 bg-blue-400 rounded text-white w-full text-center"
        :href="qrURL"
        :download="`qris-${$route.params.id}`"
      >Download</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import QRCode from '@chenfengyuan/vue-qrcode'
import QR from 'qrcode/build/qrcode'
export default {
  components: {
    // QRCode
  },
  data () {
    return {
      qrURL: null,
      donation: null
    }
  },
  computed: {
    donation_store () {
      return this.$store.state.donation.donations.find(f => f.id === this.$route.params.id)
    }
  },
  mounted () {
    if (this.donation_store) {
      this.donation = this.donation_store
      this.generateQR(this.donation.qr)
    } else {
      // TODO: Fetch data by id
      this.generateQR('hello world')
    }
  },
  methods: {
    async generateQR (data) {
      const url = await QR.toDataURL(data, { width: 300, height: 300 })

      const byteString = atob(url.split(',')[1])
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const blob = new Blob([ab], { type: 'image/jpeg' })
      const blbobURL = URL.createObjectURL(blob)
      this.qrURL = blbobURL
    }
  }
}
</script>
