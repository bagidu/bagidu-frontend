<template>
  <header class="py-6">
    <div class="w-10/12 m-auto flex items-center">
      <div id="title" class="text-xl font-semibold text-gray-800">
        <nuxt-link to="/">
          Bagidu <span class="text-green-500">ID</span>
        </nuxt-link>
      </div>
      <div class="spacer flex-grow" />
      <div v-if="!authenticated" id="navbar-links">
        <nuxt-link to="/login" class="px-4 py-2 text-gray-800 uppercase text-sm font-semibold">
          Login
        </nuxt-link>
        <nuxt-link to="/register" class="px-4 py-2 rounded border border-green-500 bg-green-500 text-white uppercase text-sm">
          Daftar
        </nuxt-link>
      </div>
      <div v-else id="navbar-authenticated">
        <nuxt-link to="/dashboard" class="px-4 py-2 rounded border border-green-500 bg-green-500 text-white uppercase text-sm">
          Dashboard
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      authenticated: false
    }
  },
  mounted () {
    if (localStorage.getItem('authenticated') === 'ok') {
      this.authenticated = true
    }
  }
}
</script>
