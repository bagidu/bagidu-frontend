<template>
  <div id="index" class="hx-screen">
    <div id="hero" class="w-10/12 m-auto ">
      <div id="hero-container" class="flex">
        <div id="left" class="flex-1 flex items-start justify-start mt-32 flex-col">
          <h2 class="text-4xl font-bold">
            Platform Dukungan Kreator
          </h2>
          <p><strong>Bagidu ID</strong> adalah platform penghubung <strong class="text-green-400">Kreator Digital</strong> dengan pendukung. Bergabunglah dengan komunitas kreator di seluruh Indonesia.</p>

          <div id="link-group" class="my-8">
            <nuxt-link to="/register" class="px-10 py-3 rounded border font-normal border-green-500 bg-green-500 text-white uppercase ">
              Daftar
            </nuxt-link>
            <nuxt-link to="/guide" class="text-sm text-green-600 p-4 hover:underline">
              Pelajari Selengkapnya
            </nuxt-link>
          </div>
        </div>
        <div id="right" class="flex-1 pt-8">
          <LandingSVG class="w-full h-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LandingSVG from '~/components/LandingSVG'
export default {
  layout: 'public',
  components: {
    LandingSVG
  }
}
</script>

<style>
</style>
