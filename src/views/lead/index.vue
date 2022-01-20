<template>
  <div>
    <div style="width: 100%;margin: auto">
      <img :src="src" style="width: 100%">
    </div>
  </div>
</template>
<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      src: require('../../assets/img/pg2.png')
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
