<template>
  <div id="login" class="w-10/12 m-auto flex justify-center">
    <div class="w-1/3 mt-20">
      <h2 class="text-2xl py-4 font-normal">
        Masuk ke <span class="font-semibold text-gray-700">Bagidu</span> <span class="font-semibold text-green-500">ID</span>
      </h2>
      <div v-if="error" id="error-message" class="text-sm text-red-400">
        {{ error }}
      </div>
      <div v-if="errors.length > 0" id="error-message" class="text-sm text-red-400 rounded border border-red-400 p-2 mb-2">
        <ul>
          <li v-for="(err,i) in errors" :key="i" class="list-disc list-inside">
            {{ err }}
          </li>
        </ul>
      </div>
      <div id="username-group">
        <label for="text" class="text-sm">Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="Username / Email"
          class="w-full rounded px-3 py-2 border border-gray-400 focus:border-green-500 outline-none"
        >
      </div>
      <div id="password-group" class="mt-3">
        <label for="password" class="text-sm">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full rounded px-3 py-2 border border-gray-400 focus:border-green-500 outline-none"
          @keydown.enter="onLogin"
        >
      </div>
      <div id="button-group" class="mt-4">
        <button
          class="px-3 py-2 bg-green-400 text-white font-semibold rounded w-full focus:outline-none"
          @click="onLogin"
        >
          Masuk
        </button>
        <p class="text-sm py-3">
          Belum punya akun?
          <nuxt-link to="/register" class="text-green-500">
            Daftar disini
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  middleware: 'guest',
  layout: 'public',
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  computed: {
    token () {
      return this.$store.state.user.token
    },
    errors () {
      return this.$store.state.user.errors
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
  },
  methods: {
    onLogin () {
      // Reset
      this.error = null
      this.$store.dispatch('user/login', { username: this.username, password: this.password })
    }
  },
  head () {
    return {
      title: 'Login | Bagidu ID'
    }
  }
}
</script>
