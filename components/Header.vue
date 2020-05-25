<template>
  <header class="pt-6 border-b border-gray-300">
    <div class="w-10/12 m-auto flex items-center">
      <div id="title" class="text-xl font-semibold text-gray-800">
        <nuxt-link to="/">
          Bagidu <span class="text-green-500">ID</span>
        </nuxt-link>
      </div>
      <div class="spacer flex-grow" />
      <div id="navbar-links">
        <nuxt-link to="/guide" class="text-gray-600 mr-2 border border-gray-400 rounded px-3 py-1 text-sm">
          Feedback
        </nuxt-link>
        <nuxt-link to="/guide" class="text-gray-600 text-sm">
          Panduan
        </nuxt-link>
        <nuxt-link v-if="user" to="/login" class="px-4 py-2 text-gray-800 uppercase text-sm font-semibold">
          {{ user.email }}
        </nuxt-link>
      </div>
    </div>
    <div id="top-menu" class="w-10/12 m-auto py-3">
      <nuxt-link to="/dashboard" class="px py-3 text-green-500 uppercase text-xs font-bold border-b-4 border-green-500">
        Dashboard
      </nuxt-link>
      <nuxt-link to="/dashboard" class="px py-4 text-gray-800 uppercase text-xs font-bold ml-4 cursor-not-allowed">
        Streaming Widget
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    user () {
      const user = this.$store.state.user
      return user ? user.profile : null
    }
  }
}
</script>
