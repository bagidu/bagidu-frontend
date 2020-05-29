<template>
  <div id="payment-method" class="border-green-400 border rounded-sm relative select-none">
    <!-- Selected -->
    <div
      id="payment-selected"
      class="flex items-center cursor-pointer p-1"
      @click="onOpen"
    >
      <div class="px-2 flex items-center">
        <div
          class="payment-icon text-white rounded  px-2 py-1 text-sm font-bold w-20 text-center"
          :class="selected.class"
        >
          {{ selected.name }}
        </div>
      </div>
      <div
        class="payment-selected-detail"
      >
        <div class="text-xs payment-description">
          {{ selected.description }}
        </div>
      </div>
      <caret class="w-6 h-6 text-green-400 mx-2" />
    </div>
    <!-- Options -->
    <div v-if="isOpen" id="options" class="absolute bg-white border-gray-400 border shadow rounded-sm p-1 mt-1 cursor-pointer">
      <!-- QRIS -->
      <div
        v-for="option in options"
        :key="option.id"
        class="flex hover:bg-green-100 py-2"
        @click="onSelect(option.id)"
      >
        <div class="px-2 flex items-center">
          <div
            class="payment-icon text-white rounded  px-2 py-1 text-sm font-bold w-20 text-center"
            :class="option.enabled ? option.class:'bg-gray-400' "
          >
            {{ option.name }}
          </div>
        </div>
        <div
          class="payment-selected-detail"
        >
          <div class="text-xs payment-description">
            {{ option.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import caret from '~/assets/svg/caret-down'
export default {
  components: {
    caret
  },
  data () {
    return {
      isOpen: false,
      selected: {
        id: 'QRIS',
        name: 'QRIS',
        class: 'bg-blue-500',
        enabled: true,
        description: 'Scan QR Code dengan GoPay, Dana, LinkAja, OVO, ShopeePay, BCA, CIMB, Bank Jatim'
      },
      options: [
        {
          id: 'QRIS',
          name: 'QRIS',
          class: 'bg-blue-500',
          enabled: true,
          description: 'Scan QR Code (QRIS) dengan GoPay, Dana, LinkAja, OVO, ShopeePay'
        },
        {
          id: 'OVO',
          name: 'OVO',
          class: 'bg-purple-600',
          enabled: false,
          description: 'Pembayaran (direct) dengan aplikasi OVO (segera hadir)'
        },
        {
          id: 'DANA',
          name: 'DANA',
          class: 'bg-blue-400',
          enabled: false,
          description: 'Pembayaran (direct) dengan aplikasi DANA (segera hadir)'
        },
        {
          id: 'LINKAJA',
          name: 'LINKAJA',
          class: 'bg-red-600',
          enabled: false,
          description: 'Pembayaran (direct) dengan aplikasi LINKAJA (coming soon)'
        }
        // {
        //   id: 'BANK',
        //   name: 'BANK',
        //   // class: 'bg-red-600',
        //   class: 'bg-gray-300',
        //   description: 'Pembayaran (direct) dengan aplikasi LINKAJA (coming soon)'
        // },
        // {
        //   id: 'JENIUS',
        //   name: 'JENIUS',
        //   // class: 'bg-red-600',
        //   class: 'bg-gray-300',
        //   description: 'Pembayaran (direct) dengan aplikasi LINKAJA (coming soon)'
        // },
        // {
        //   id: 'PAYPAL',
        //   name: 'PAYPAL',
        //   // class: 'bg-red-600',
        //   class: 'bg-gray-300',
        //   description: 'Pembayaran (direct) dengan aplikasi LINKAJA (coming soon)'
        // }
      ]
    }
  },
  methods: {
    onOpen () {
      this.isOpen = !this.isOpen
    },
    onSelect (id) {
      const selected = this.options.find(f => f.id === id)
      if (!selected.enabled) {
        return false
      }
      this.$emit('select', id)
      this.isOpen = false
      this.selected = selected
    }
  }
}
</script>
