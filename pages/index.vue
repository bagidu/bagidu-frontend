<template>
  <div id="index" class="h-screen">
    <div id="hero" class="w-10/12 m-auto h-full">
      <div id="hero-container" class="flex">
        <div id="left" class="flex-1 flex items-start justify-start mt-32 flex-col">
          <h2 class="text-4xl font-bold">
            Platform Dukungan Kreator
          </h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore veritatis laboriosam sint enim nisi hic laudantium facere sapiente magnam. Molestias officia eum omnis voluptates obcaecati dolorum aut laudantium, quaerat deleniti.</p>

          <div id="link-group" class="my-8">
            <nuxt-link to="/register" class="px-10 py-3 rounded border font-normal border-green-500 bg-green-500 text-white uppercase ">
              Daftar
            </nuxt-link>
            <nuxt-link to="/guide" class="text-sm text-green-600 p-4 hover:underline">
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
  layout: 'public',
  components: {
    LandingSVG
  }
}
</script>

<style>
</style>
