<template>
  <div id="dashboard-overview">
    <div id="container">
      <div id="balance-container" class="flex mt-8 justify-between">
        <div id="feed" class="w-7/12 mr-2">
          <h3 class="text-xl font-semibold mb-3">
            Dukungan
          </h3>
          <div id="feed-list">
            <div v-for="item in transactions" :key="item.id" class="feed-item rounded border border-gray-300 px-3 pb-3 mb-4">
              <div class="title flex px-2 pt-3 items-center">
                <h4 class="font-semibold">
                  {{ item.name }}
                </h4>
                <ago class="flex-grow text-right text-sm" :time="item.createdAt" />
              </div>
              <div class="feed-meta flex justify-start text-sm px-2 py-2">
                <div class="amount font-bold text-green-500 text-lg">
                  Rp. {{ item.amount.toLocaleString() }}
                </div>

                <div class="flex items-center">
                  <div class="payment-via bg-blue-200 rounded-full font-semibold text-blue-700 px-2 py-0 mx-2 text-xs font-semibold">
                    QRIS
                  </div>
                </div>
              </div>
              <div class="feed-message px-2 mt-2 text-sm">
                {{ item.message ? item.message :'No Message' }}
              </div>
            </div>
          </div>
        </div>
        <div id="overview" class="w-5/12 ml-2">
          <h3 class="text-xl font-semibold mb-3">
            Total Pendapatan
          </h3>
          <div class=" border border-gray-300 rounded flex flex-col py-4">
            <div class="balance flex items-center justify-center py-4 font-bold text-5xl text-green-400">
              Rp 1.000.000
            </div>
            <div class="withdraw flex justify-end mx-4">
              <nuxt-link to="/dashboard/withdraw" class="text-green-400 font-bold text-lg border border-transparent rounded px-3 hover:border-green-300">
                Tarik Dana
              </nuxt-link>
            </div>
          </div>

          <h3 class="text-xl font-semibold my-3">
            Link Profile
          </h3>
          <div id="link-profile" class="rounded border border-gray-300 flex ">
            <div class="flex-grow px-3 py-1 select-all">
              {{ `https://bagidu.id/${user.username}` }}
            </div>
            <div id="profile-copy" class="text-sm bg-gray-200 px-2 py-1 hover:bg-gray-300 cursor-pointer">
              Copy
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ago from '~/components/lib/ago'
export default {
  layout: 'dashboard',
  components: {
    ago
  },
  computed: {
    user () {
      return this.$store.state.user.profile
    },
    transactions () {
      return this.$store.state.donation.transactions
    }
  },
  mounted () {
    this.getTransaction()
  },
  methods: {
    getTransaction () {
      this.$store.dispatch('donation/getTransaction')
    }
  },
  head () {
    return {
      title: 'Dashboard | Bagidu ID'
    }
  }
}
</script>
