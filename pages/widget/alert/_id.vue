<template>
  <div id="alert" class="bg-transparent flex justify-center pt-20">
    <!-- Alert -->
    <transition name="fade">
      <Alert
        v-if="alertShown"
        :amount="alertShown.amount"
        :name="alertShown.name"
        :message="alertShown.message"
        :timeout="10"
        @finish="onAlertFinish"
      />
    </transition>
  </div>
</template>
<script>
import io from 'socket.io-client'
import Alert from '~/components/streaming/Alert'
let server = null
export default {
  components: {
    Alert
  },
  data () {
    return {
      alerts: [],
      alertShown: null
    }
  },
  mounted () {
    server = io(process.env.WS_URL || 'localhost:3030')
    server.on(`alert:${this.$route.params.id}`, (alert) => {
      console.log(`incoming alert:${this.$route.params.id}`, alert)
      this.onReceiveAlert(alert)
    })

    server.on('connect', () => {
      console.log('socket connected')
    })

    server.on('disconnect', () => {
      console.log('socket disonnected')
    })
  },
  beforeDestroy () {
    server.close()
  },
  methods: {
    onReceiveAlert (alert) {
      this.alerts.push(alert)
      console.log('this alerts', this.alerts)
      this.showAlert()
    },
    onAlertFinish () {
      this.alertShown = null

      setTimeout(() => {
        this.showAlert()
      }, 1000)
      // this.showAlert()
    },
    showAlert () {
      console.log('showAlert called', this.alerts)
      if (this.alerts.length > 0 && !this.alertShown) {
        this.alertShown = this.alerts[0]
        this.alerts = this.alerts.filter((f, i) => i !== 0)
      }
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
