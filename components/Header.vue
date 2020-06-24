<template>
  <header class="pt-6 border-b border-gray-300">
    <div class="flex items-center w-10/12 m-auto">
      <div id="title" class="text-xl font-semibold text-gray-800">
        <nuxt-link to="/">
          Bagidu <span class="text-green-500">ID</span>
        </nuxt-link>
      </div>
      <div class="flex-grow spacer" />
      <div id="navbar-links" class="flex items-center">
        <nuxt-link v-if="false" to="/feedback" class="px-3 py-1 mr-2 text-sm text-gray-600 border border-gray-400 rounded">
          Feedback
        </nuxt-link>
        <nuxt-link v-if="false" to="/guide" class="text-sm text-gray-600">
          Panduan
        </nuxt-link>
        <div
          id="profile"
          class="relative flex items-center cursor-pointer select-none"
          @click="onProfileOpen"
        >
          <div
            id="avatar"
            class="flex items-center justify-center w-8 h-8 ml-4 font-bold text-center text-white uppercase rounded-full"
            :class="{'bg-green-400':user && user.name, 'bg-gray-200': !user}"
          >
            {{ user && user.name ? user.name[0]:'' }}
          </div>
          <div v-if="user" to="/dashboard" class="py-2 pl-2 text-sm font-semibold text-gray-700 capitalize">
            {{ user.name }}
          </div>
          <div v-else id="user-loading" velse class="w-20 py-2 pl-2 ml-2 bg-gray-200 rounded-sm">
            <!-- Loading -->
          </div>
          <!-- Profile Options -->
          <div
            v-if="profileOpen"
            id="profile-options"
            class="absolute py-2 text-gray-700 bg-white border border-gray-300 rounded shadow"
            style="top: 45px; right:0; width: 170px;"
          >
            <ul class="text-sm font-semibold">
              <li v-if="false" class="px-3 py-2 hover:bg-gray-200">
                Pengautran Akun
              </li>
              <li
                class="px-3 py-2 hover:bg-gray-200"
                @click="onLogout"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="top-menu" class="w-10/12 py-3 m-auto text-gray-700">
      <nuxt-link
        to="/dashboard"
        class="py-3 text-xs font-bold uppercase px"
        :class="{
          'border-b-4 border-green-500 text-green-500':$route.path==='/dashboard'
        }"
      >
        Dashboard
      </nuxt-link>
      <nuxt-link
        to="/dashboard/streaming"
        class="py-3 ml-4 text-xs font-bold uppercase px"
        :class="{
          'border-b-4 border-green-500 text-green-500':$route.path==='/dashboard/streaming'
        }"
      >
        Streaming
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      profileOpen: false
    }
  },
  computed: {
    user () {
      const user = this.$store.state.user
      return user ? user.profile : null
    }
  },
  methods: {
    onProfileOpen () {
      if (!this.user) {
        return false
      }
      this.profileOpen = !this.profileOpen
    },
    onLogout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
