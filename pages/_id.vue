<template>
  <div>
    <Donate :username="$route.params.id" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import Donate from '@/components/donations/Donate'
export default {
  components: {
    Donate
  },
  mounted () {
    console.log('mounted:route', this.route)
  }
}
</script>
