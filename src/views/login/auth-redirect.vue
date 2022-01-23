<template>
  <div class="forget-password">
    <el-button
      style="margin: 12px"
      size="small"
      type="plain"
      @click="back"
    >返回登录</el-button>
    <div style="width: 70%; margin: 20px auto">
      <h2>忘记密码</h2>
      <el-row style="width: 100%; padding-top: 55px">
        <el-steps :active="active" style="padding: 55x 0">
          <el-step title="第1步" icon="el-icon-success" />
          <el-step title="第2步" icon="el-icon-success" />
          <el-step title="已完成" icon="el-icon-success" />
        </el-steps>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    next() {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.m50 {
  margin: 50px;
}
</style>
