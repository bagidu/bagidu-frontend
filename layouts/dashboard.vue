<template>
  <div id="#dashboard">
    <header-dashboard />
    <div id="content" class="w-10/12 m-auto">
      <nuxt-child />
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
