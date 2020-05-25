<template>
  <div id="error" class="h-screen flex items-center justify-center flex-col">
    <div class="emoji text-4xl">
      🤕🥵😵
    </div>
    <p class="message text-2xl">
      <strong>{{ error.statusCode }}</strong> {{ error.message }}
    </p>
    <nuxt-link to="/" class="text-green-500 hover:underline p-5">
      Kembali
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
