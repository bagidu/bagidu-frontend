<template>
  <div id="donate" class="bg-white h-screen">
    <div id="container" class="md:w-1/2 lg:w-1/3 m-auto bg-white">
      <QRCode :options="{width: 300}" value="00020101021226690017COM.TELKOMSEL.WWW011893600911002414220002152003260414220010303UME51450015ID.OR.GPNQR.WWW02150000000000000000303UME520454995802ID5920Placeholder merchant6007Jakarta610612345662380115Wxs7urG4Yczndkl0715Wxs7urG4Yczndkl5303360540415006304FBC9" />
    </div>
  </div>
</template>

<script>
import QRCode from '@chenfengyuan/vue-qrcode'
export default {
  components: {
    QRCode
  }
}
</script>
