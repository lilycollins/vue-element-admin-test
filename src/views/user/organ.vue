<template>
  <div>
    <div v-show="showParent">
      <el-button type="primary" size="medium" style="width: 110px; margin: 24px">创建组织</el-button>
      <div style="margin: 30px 50px" @click="toggleShow">
        <img :src="src" style="height: 100%">
      </div>
    </div>
    <div v-show="!showParent">
      <el-button type="primary" size="medium" style="width: 110px; margin: 24px">编辑组织</el-button>
      <div style="margin: 30px 50px">
        <img :src="src2" style="height: 100%">
      </div>
      <el-button style="margin: 12px" size="small" type="plain" @click="toggleShow">返回</el-button>
    </div>
  </div>

</template>
<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      showParent: true,
      src: require('../../assets/img/organ1.png'),
      src2: require('../../assets/img/organ2.png')
    }
  },
  methods: {
    toggleShow() {
      this.showParent = !this.showParent
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
