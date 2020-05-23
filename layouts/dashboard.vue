<template>
  <div id="#dashboard">
    <HeaderDashboard />
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
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$store.dispatch('user/getUser')
    }
  }
}
</script>
