<template>
  <div id="register" class="w-10/12 m-auto flex justify-center">
    <div class="w-1/3 mt-6">
      <h2 class="text-2xl py-4 font-normal">
        Mendaftar Akun <span class="font-semibold text-gray-700">Bagidu</span> <span class="font-semibold text-green-500">ID</span>
      </h2>
      <div v-if="errors.length > 0" id="error-message" class="text-sm text-red-400 rounded border border-red-400 p-2 mb-2">
        <ul>
          <li v-for="(error,i) in errors" :key="i" class="list-disc list-inside">
            {{ error }}
          </li>
        </ul>
      </div>
      <div id="name-group">
        <label for="text" class="text-sm">Nama</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Nama Lengkap"
          class="w-full rounded px-3 py-2 border border-gray-400 focus:border-green-500 outline-none"
        >
      </div>
      <div id="email-group">
        <label for="text" class="text-sm">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="w-full rounded px-3 py-2 border border-gray-400 focus:border-green-500 outline-none"
        >
      </div>
      <div id="username-group">
        <label for="text" class="text-sm">Username</label>
        <input
          v-model="form.username"
          type="text"
          placeholder="Username"
          class="w-full rounded px-3 py-2 border border-gray-400 focus:border-green-500 outline-none"
        >
      </div>
      <div id="password-group">
        <label for="text" class="text-sm">Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="w-full rounded px-3 py-2 border border-gray-400 focus:border-green-500 outline-none"
        >
        <div id="button-group" class="mt-4">
          <button
            class="px-3 py-2 bg-green-400 text-white font-semibold rounded w-full focus:outline-none"
            @click="onSubmit"
          >
            Daftar
          </button>
          <p class="text-sm py-3">
            Sudah punya akun?
            <nuxt-link to="/login" class="text-green-500">
              Masuk
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  layout: 'public',
  data () {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: ''
      }
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
  beforeMount () {
    if (localStorage.getItem('authenticated') === 'ok') {
      return this.$router.replace('/dashboard')
    }
  },
  mounted () {
    // const user = this.$store.state.user

    // if (user && user.token && !user.profile) {
    //   this.$store.dispatch('user/getUser')
    // } else if (user && !user.token) {
    //   this.$store.dispatch('user/getToken')
    // }
  },
  methods: {
    onSubmit () {
      // Validate

      // Send Data
      this.$store.dispatch('user/signup', this.form)
    }
  }
}
</script>
