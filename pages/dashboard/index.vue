<template>
  <div id="dashboard-overview">
    <div id="container">
      <div id="balance-container" class="flex mt-8 justify-between">
        <div id="feed" class="w-7/12 mr-2">
          <h3 class="text-xl font-semibold mb-3">
            Dukungan
          </h3>
          <div id="feed-list">
            <div v-for="item in 10" :key="item" class="feed-item rounded border border-gray-200 px-3 pb-3 mb-4">
              <h4 class="px-2 pt-3 font-semibold">
                Nama Fans
              </h4>
              <div class="feed-meta flex justify-start text-sm px-2 py-2">
                <div class="amount font-bold text-green-500 text-lg">
                  Rp. 200.000
                </div>
                <div class="payment-via bg-blue-200 rounded-full font-semibold text-blue-700 px-2 py-1 mx-2 text-xs font-semibold">
                  QRIS
                </div>
                <div class="timestamp flex-grow text-right">
                  2hr yang lalu
                </div>
              </div>
              <div class="feed-message px-2 mt-2 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quisquam soluta ullam quas hic numquam, alias blanditiis magnam modi neque repellat repudiandae temporibus voluptate ducimus ipsa exercitationem vitae? Optio, iste?
              </div>
            </div>
          </div>
        </div>
        <div id="balance" class="w-5/12 ml-2">
          <h3 class="text-xl font-semibold mb-3">
            Total Pendapatan
          </h3>
          <div class=" border border-gray-400 rounded flex flex-col py-4">
            <div class="balance flex items-center justify-center py-4 font-bold text-5xl text-green-400">
              Rp 1.000.000
            </div>
            <div class="withdraw flex justify-end mx-4">
              <nuxt-link to="/dashboard/withdraw" class="text-green-400 font-bold text-lg border border-transparent rounded px-3 hover:border-green-300">
                Tarik Dana
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard'
}
</script>
