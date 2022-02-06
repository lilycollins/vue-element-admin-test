<template>
  <div v-if="src" ref="Iframe" v-loading="loading" class="ld-frame">
    <iframe id="iframe" class="iframe" :src="src" frameborder="0" :height="iframeHeight" />
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false,
      iframeHeight: 0,
      src: 'http://cfg.aiotos.net/display.html?tag=displays/test/JCY/JSC.json',
      selectedAnchor: ''
    }
  },
  mounted() {
    this.iframeLoad()
    this.$nextTick(() => {
      this.iframeHeight = this.$refs.Iframe.offsetHeight
    })
  },
  methods: {
    iframeLoad() {
      this.loading = true
      const iframe = document.querySelector('#iframe')
      if (iframe.attachEvent) { // IE
        iframe.attachEvent('onload', () => { this.loading = false })
      } else { // 非IE
        iframe.onload = () => { this.loading = false }
      }
    }
  }
  }
</script>
<style lang="scss">
$blue: #048AFA;
.ld-frame {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #fff;
  .iframe {
    min-width: 100%;
    width: 0;
    *width: 100%;
    border-width: 0;
  }
}
</style>
