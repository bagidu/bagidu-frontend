<template>
  <div id="donate" class="bg-white h-screen">
    <div id="container" class="md:w-1/2 lg:w-1/3 m-auto bg-white">
      <!-- Title -->
      <div id="donate-title" class="text-lg font-bold text-gray-700 text-center pt-5 pb-3 text-4xl">
        Donasi ke <span class="text-green-500">{{ username }}</span>
      </div>
      <!-- Amount -->
      <div id="amount" class="px-4 pb-4">
        <div class="flex flex-row border border-green-400 rounded items-center bg-white text-gray-700">
          <div class="bg-white rounded-l px-2  font-bold text-3xl">
            Rp.
          </div>
          <input
            id="amount"
            v-model="amount"
            type="number"
            name="amount"
            class="flex-grow w-full rounded-r outline-none  text-3xl font-bold"
          >
        </div>
        <div id="amount-preset" class="flex flex-row mt-4">
          <div
            v-for="(item,idx) in amountPreset"
            :key="item.value"
            class="amount-preset-item px-3 py-2 rounded border border-green-400 bg-white flex-grow text-center text-xl text-gray-700 font-semibold cursor-pointer select-none"
            :class="{
              ' mr-1':idx + 1 !== amountPreset.length,
              'bg-green-200': item.value === amount
            }"
            @click="onSetAmount(item.value)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div id="name" class="px-4 pb-4">
        <input
          id="name"
          v-model="name"
          placeholder="Nama kamu"
          type="text"
          class="flex-grow rounded border border-green-400 px-3 py-1 w-full outline-none  text-lg font-normal"
        >
      </div>
      <!-- Message -->
      <div id="message" class="px-4 pb-4">
        <textarea
          v-model="message"
          placeholder="Pesan kamu"
          class="flex-grow rounded border border-green-400 px-3 py-1 w-full outline-none  text-xl font-normal text-gray-700"
          rows="2"
        />
      </div>
      <!-- Button -->
      <div id="button-container" class="px-4">
        <button
          class="rounded bg-green-400 text-white text-xl font-extrabold w-full py-3 mb-4 focus:outline-none"
          @click="onProcessDonate"
        >
          Donasi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      amount: 0,
      name: '',
      message: '',
      amountPreset: [
        {
          name: '5K',
          value: 5000
        },
        {
          name: '10K',
          value: 10000
        },
        {
          name: '50K',
          value: 50000
        },
        {
          name: '100K',
          value: 100000
        }
      ]
    }
  },
  methods: {
    onProcessDonate () {
      this.$api.post(`/donation/${this.username}`, {
        name: this.name,
        amount: this.amount,
        message: this.message
      }).then((res) => {
        if (res.status === 201) {
          const data = res.data
          if (data.id) {
            this.$router.push(`/pay/${data.id}`)
            this.$store.commit('donation/append', data)
          } else {
            console.err('server not respond with id')
          }
        }
      }).catch((err) => {
        console.log('error when make donation', err)
      })
    },
    onSetAmount (amount) {
      this.amount = amount
    }
  }
}
</script>
