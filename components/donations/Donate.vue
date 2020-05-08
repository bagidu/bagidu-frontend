<template>
  <div id="donate" class="bg-white h-screen">
    <div id="container" class="w-1/3 m-auto bg-gray-300">
      <!-- Title -->
      <div id="donate-title" class="text-lg font-bold text-gray-700 text-center p-5">
        Donasi Ke <span class="text-teal-500">{{ username }}</span>
      </div>
      <!-- Amount -->
      <div id="amount" class="p-4">
        <div class="flex flex-row border border-teal-500 rounded items-center bg-white">
          <div class="bg-white rounded-l px-2 py-1 font-bold text-3xl">
            Rp.
          </div>
          <input
            id="amount"
            v-model="amount"
            type="number"
            name="amount"
            class="flex-grow rounded-r outline-none  text-3xl font-bold"
          >
        </div>
        <div id="amount-preset" class="flex flex-row mt-4">
          <div
            v-for="(item,idx) in amountPreset"
            :key="item.value"
            class="amount-preset-item px-3 py-2 rounded border border-teal-500 bg-white flex-grow text-center text-3xl"
            :class="{' mr-1':idx + 1 !== amountPreset.length}"
            @click="onSetAmount(item.value)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- Button -->
      <div id="button-container" class="px-4">
        <button class="rounded bg-teal-500 text-white text-xl font-extrabold w-full py-3 mb-4 outline-none">
          Donasi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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

    onSetAmount (amount) {
      this.amount = amount
    }
  }
}
</script>
