<template>
  <div id="register" class="w-10/12 m-auto">
    <h2 class="text-4xl font-bold text-green-500 text-center p-20">
      Coming Soon
    </h2>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  layout: 'public',
  computed: {
    token () {
      return this.$store.state.user.token
    }
  },
  watch: {
    token (token) {
      if (token) {
        this.$router.replace('/dashboard')
      }
    }
  },
  mounted () {
    const user = this.$store.state.user
    if (user && user.token && !user.profile) {
      this.$store.dispatch('user/getUser')
    } else if (user && !user.token) {
      this.$store.dispatch('user/getToken')
    }
  }
}
</script>
