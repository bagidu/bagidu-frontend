<template>
  <div id="index" class="h-screen">
    <header class="py-6">
      <div class="w-10/12 m-auto flex items-center">
        <div id="title" class="text-xl font-semibold text-gray-800">
          <nuxt-link to="/">
            Bagidu <span class="text-green-500">ID</span>
          </nuxt-link>
        </div>
        <div class="spacer flex-grow" />
        <div id="navbar-links">
          <nuxt-link to="/login" class="px-4 py-2 text-gray-800 uppercase text-sm font-semibold">
            Login
          </nuxt-link>
          <nuxt-link to="/signup" class="px-4 py-2 rounded border border-green-500 bg-green-500 text-white uppercase text-sm">
            Daftar
          </nuxt-link>
        </div>
      </div>
    </header>
    <div id="hero" class="w-10/12 m-auto h-full">
      <div id="hero-container" class="flex">
        <div id="left" class="flex-1 flex items-start justify-start mt-32 flex-col">
          <h2 class="text-4xl font-semibold">
            Platform Dukungan Kreator
          </h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore veritatis laboriosam sint enim nisi hic laudantium facere sapiente magnam. Molestias officia eum omnis voluptates obcaecati dolorum aut laudantium, quaerat deleniti.</p>

          <div id="link-group" class="my-8">
            <nuxt-link to="/signup" class="px-10 py-3 rounded border font-normal border-green-500 bg-green-500 text-white uppercase ">
              Daftar
            </nuxt-link>
            <nuxt-link to="/panduan" class="text-sm text-green-600 p-4 hover:underline">
              Pelajari Selengkapnya
            </nuxt-link>
          </div>
        </div>
        <div id="right" class="flex-1">
          <LandingSVG class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LandingSVG from '~/components/LandingSVG'
export default {
  components: {
    LandingSVG
  }
}
</script>

<style>
</style>
