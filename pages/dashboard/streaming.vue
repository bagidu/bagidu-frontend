<template>
  <div id="streaming" class="">
    <div id="streaming-header" class="py-4">
      <h2 class="text-xl font-semibold">
        Streaming Widget
      </h2>
      <p class="text-sm">
        Streaming widget dapat digunakan pada aplikasi OBS / Streamlab OBS dengan source Browser
      </p>
    </div>
    <div id="alert" class="">
      <h3 class="text-lg font-semibold text-green-500">
        Alert
      </h3>
      <div id="alert-config">
        <label for="link-profile" class="text-xs">URL Unik untuk digunakan pada aplikasi OBS</label>
        <div id="link-profile" class="rounded border border-gray-300 flex ">
          <div class="flex-grow px-3 py-1 select-all">
            {{ `https://bagidu.id/widget/alert/aaaaabbbbbbcccccddddddddddeeeeee` }}
          </div>
          <div id="profile-copy" class="text-sm bg-gray-200 px-2 py-1 hover:bg-gray-300 cursor-pointer">
            Copy
          </div>
          <a
            id="profile-copy"
            target="_blank"
            :href="`https://bagidu.id/widget/alert/aaaaabbbbbbcccccddddddddddeeeeee`"
            class="text-sm bg-gray-200 px-2 py-1 hover:bg-gray-300 cursor-pointer border-l border-gray-400"
          >
            Open
          </a>
        </div>
      </div>
    </div>
    <!-- Preview -->
    <h3 class="font-semibold mt-4">
      Preview
    </h3>
    <div class="bg-white p-4 border border-gray-300 rounded mt-2">
      <Alert
        :amount="100000"
        message="Buat jajan gan, semangat terus streamingnya!"
        name="Joko Santoso"
      />
    </div>
  </div>
</template>

<script>
import Alert from '~/components/streaming/Alert'
export default {
  layout: 'dashboard',
  components: {
    Alert
  },
  head () {
    return {
      title: 'Streaming Setting | Bagidu ID'
    }
  }
}
</script>
