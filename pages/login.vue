<template>
  <div id="login" class="w-10/12 m-auto flex justify-center">
    <div class="w-1/3 mt-20">
      <h2 class="text-2xl py-4 font-normal">
        Login to <span class="font-semibold text-gray-700">Bagidu</span> <span class="font-semibold text-green-500">ID</span>
      </h2>
      <div v-if="error" id="error-message" class="text-sm text-red-400">
        {{ error }}
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
          Login
        </button>
        <p class="text-sm py-3">
          Belum punya akun?
          <nuxt-link to="/signup" class="text-green-500">
            Daftar disini
          </nuxt-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  layout: 'public',
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    onLogin () {
      // Reset
      this.error = null

      // Send Request
      this.$api.post('/auth/login',
        {
          username: this.username,
          password: this.password
        },
        {
          withCredentials: true
        }
      )
        .then((resp) => {
          console.log('login success', resp.data)
        })
        .catch((err) => {
          this.error = err.message
          console.log('login error', err)
        })
    }
  },
  head () {
    return {
      title: 'Login | Bagidu ID'
    }
  }
}
</script>
