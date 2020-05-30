<template>
  <header class="pt-6 border-b border-gray-300">
    <div class="w-10/12 m-auto flex items-center">
      <div id="title" class="text-xl font-semibold text-gray-800">
        <nuxt-link to="/">
          Bagidu <span class="text-green-500">ID</span>
        </nuxt-link>
      </div>
      <div class="spacer flex-grow" />
      <div id="navbar-links" class="flex items-center">
        <nuxt-link to="/feedback" class="text-gray-600 mr-2 border border-gray-400 rounded px-3 py-1 text-sm">
          Feedback
        </nuxt-link>
        <nuxt-link to="/guide" class="text-gray-600 text-sm">
          Panduan
        </nuxt-link>
        <div
          id="profile"
          class="flex items-center cursor-pointer relative select-none"
          @click="onProfileOpen"
        >
          <div
            id="avatar"
            class="ml-4 h-8 w-8 rounded-full text-center font-bold uppercase text-white flex items-center justify-center"
            :class="{'bg-green-400':user && user.name, 'bg-gray-200': !user}"
          >
            {{ user && user.name ? user.name[0]:'' }}
          </div>
          <div v-if="user" to="/dashboard" class="pl-2 py-2 text-gray-700 capitalize text-sm font-semibold">
            {{ user.name }}
          </div>
          <div v-else id="user-loading" velse class="py-2 pl-2 bg-gray-200 rounded-sm w-20 ml-2">
            <!-- Loading -->
          </div>
          <!-- Profile Options -->
          <div
            v-if="profileOpen"
            id="profile-options"
            class="absolute bg-white shadow border border-gray-300 py-2 rounded text-gray-700"
            style="top: 45px; right:0; width: 170px;"
          >
            <ul class="text-sm font-semibold">
              <li class="px-3 py-2 hover:bg-gray-200">
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
    <div id="top-menu" class="w-10/12 m-auto py-3 text-gray-700">
      <nuxt-link
        to="/dashboard"
        class="px py-3 uppercase text-xs font-bold"
        :class="{
          'border-b-4 border-green-500 text-green-500':$route.path==='/dashboard'
        }"
      >
        Dashboard
      </nuxt-link>
      <nuxt-link
        to="/dashboard/streaming"
        class="px py-3 uppercase text-xs font-bold ml-4"
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
