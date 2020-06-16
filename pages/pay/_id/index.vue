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
import gql from 'graphql-tag'

let checkInterval = null
export default {
  components: {
    // QRCode
  },
  data () {
    return {
      qrURL: null
    }
  },
  computed: {
    donation () {
      return this.$store.state.donation.data
    }
  },
  watch: {
    donation (val) {
      if (val) {
        this.checkPaymentStatus()
        this.generateQR(val.qr)
      }
    }
  },
  mounted () {
    if (this.donation) {
      this.checkPaymentStatus()
      this.generateQR(this.donation.qr)
    }
  },
  beforeDestroy () {
    if (checkInterval) {
      console.log('clear interval on unmount')
      clearInterval(checkInterval)
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
    },
    checkPaymentStatus () {
      if (this.donation.status === 'SUCCESS') {
        this.$router.replace(`/pay/${this.$route.params.id}/success`)
      } else {
        if (checkInterval) {
          return false
        }
        checkInterval = setInterval(async () => {
          try {
            const resp = await this.$apollo.query({
              query: gql`query($id:String!){
                donation(id:$id) {
                  id
                  name
                  amount
                  qr
                  message
                  status
                }
              }
              `,
              variables: {
                id: this.$route.params.id
              },
              fetchPolicy: 'no-cache'
            })
            console.log('interval result', resp.data.donation)
            this.$store.commit('donation/set', resp.data.donation)
          } catch (e) {
            console.log('error get payment status', e)
          }
        }, 5000)
      }
    }
  },
  async validate ({ params, app, store }) {
    const resp = await app.$api.get(`/donation/${params.id}`)
    store.commit('donation/set', resp.data)
    return resp.status === 200
  }
}
</script>
