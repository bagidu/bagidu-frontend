<template>
  <div id="donate" class="bg-white h-screen">
    <div id="container" class="md:w-1/2 lg:w-1/3 m-auto bg-white">
      <!-- Title -->
      <div id="donate-title" class="text-lg font-bold text-gray-700 text-center pt-5 pb-3 text-4xl">
        Donasi ke <span class="text-green-500">{{ username }}</span>
      </div>
      <!-- Amount -->
      <div id="amount" class="px-4 pb-4">
        <div
          class="flex flex-row border rounded items-center bg-white text-gray-700"
          :class="{
            'border-red-500':form_errors.filter(f=>f.field==='amount').length >0,
            'border-green-400':form_errors.filter(f=>f.field==='amount').length <=0
          }"
        >
          <div class="bg-white rounded-l px-2  font-bold text-3xl">
            Rp.
          </div>
          <input
            id="amount"
            v-model.number="amount"
            type="number"
            name="amount"
            min="1500"
            max="2000000"
            step="1000"
            class="flex-grow w-full rounded-r outline-none  text-3xl font-bold"
          >
        </div>
        <!-- Amount Validation Error -->
        <div
          v-for="(error,i) in form_errors.filter(f => f.field ==='amount')"
          :key="i"
          class="validation text-xs text-red-600 mt-1"
        >
          {{ error.message }}
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
      <div id="name" class="px-4 pb-2">
        <label for="name" class="text-sm">Nama</label>
        <input
          id="name"
          v-model="name"
          placeholder="Nama kamu"
          type="text"
          class="flex-grow rounded border border-green-400 px-3 py-1 w-full outline-none  text-lg font-normal"
        >
        <!-- Name Validation Error -->
        <div
          v-for="(error,i) in form_errors.filter(f => f.field ==='name')"
          :key="i"
          class="validation text-xs text-red-600 mt-1"
        >
          {{ error.message }}
        </div>
      </div>
      <!-- Message -->
      <div id="message" class="px-4 pb-2">
        <label for="message" class="text-sm">Pesan (Opsional)</label>
        <textarea
          v-model="message"
          placeholder="Pesan kamu"
          class="flex-grow rounded border border-green-400 px-3 py-1 w-full outline-none  text-xl font-normal text-gray-700"
          rows="2"
        />
      </div>
      <!-- Payment Method -->
      <div id="payments" class="px-4 pb-4">
        <label for="Payment" class="text-sm">Metode Pembayaran</label>
        <PaymentMethod class="" />
      </div>

      <!-- Button -->
      <div id="button-container" class="px-4">
        <button
          :disabled="loading"
          class="rounded bg-green-400 text-white text-xl font-extrabold w-full py-3 mb-4 focus:outline-none disabled:bg-opacity-50 disabled:cursor-wait"
          @click="onProcessDonate"
        >
          {{ loading ? 'Processing...':'Donasi' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentMethod from '~/components/donations/PaymentMethod'
export default {
  components: {
    PaymentMethod
  },
  data () {
    return {
      amount: 5000,
      name: '',
      message: '',
      payment_method: 'QRIS',
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
          name: '20K',
          value: 20000
        },
        {
          name: '50K',
          value: 50000
        },
        {
          name: '100K',
          value: 100000
        }
      ],
      form_errors: [],
      loading: false
    }
  },
  computed: {
    username () {
      return this.$route.params.id
    }
  },
  watch: {
    amount () {
      this.onValidateForm()
    },
    name () {
      this.onValidateForm()
    }
  },
  methods: {
    onValidateForm () {
      // Reset
      this.form_errors = []

      // Validate Form
      if (!this.name) {
        this.form_errors.push({ field: 'name', message: 'Jangan lupa tulis nama kamu ya' })
      }

      if (this.amount < 1500) {
        this.form_errors.push({ field: 'amount', message: 'Minimal donasi 1500 gan!' })
      }

      if (this.amount > 2000000) {
        this.form_errors.push({ field: 'amount', message: 'Maksimal sekali donasi 2jt' })
      }
    },
    onProcessDonate () {
      if (this.loading) {
        // Stop On Loading
        return false
      }

      this.onValidateForm()
      if (this.form_errors.length > 0) {
        return false
      }

      this.loading = true
      this.$api.post(`/donation/${this.username}`, {
        name: this.name,
        amount: parseInt(this.amount),
        message: this.message,
        payment_method: this.payment_method
      }).then((res) => {
        if (res.status === 201) {
          const data = res.data
          if (data.id) {
            this.$router.push(`/pay/${data.id}`)
            this.$store.commit('donation/set', data)
          } else {
            console.err('server not respond with id')
          }
        }
      })
        .catch((err) => {
          console.log('error when make donation', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSetAmount (amount) {
      this.amount = amount
    }
  },
  async validate ({ params, app }) {
    try {
      const resp = await app.$api.get(`/user/${params.id}`)
      return resp.status === 200
    } catch {
      return false
    }
  },
  head () {
    return {
      title: `Donasi ke ${this.username} | Bagidu ID`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Ayo dukung ${this.username} di Bagidu ID platform donasi untuk creator.`
        }
      ]
    }
  }
}
</script>
