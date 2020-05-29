<template>
  <div id="#dashboard">
    <header-dashboard />
    <p id="beta" class="text-sm bg-yellow-100 text-yellow-600 w-10/12 m-auto p-2 mt-2 rounded border border-yellow-500 text-center">
      <strong>Bagidu ID</strong> masih dalam tahap <strong>Beta</strong>, beberapa fitur masih dalam pengerjaan, mohon bersabar 🤗
    </p>
    <div id="content" class="w-10/12 m-auto">
      <nuxt-child v-if="user.profile" />
      <div v-else id="dashboard-loading">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDashboard from '~/components/Header'
export default {
  components: {
    HeaderDashboard
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      if (this.user && this.user.token && !this.user.profile) {
        this.$store.dispatch('user/getUser')
      } else if (this.user && !this.user.token) {
        this.$store.dispatch('user/getToken')
      }
    }
  }
}
</script>
