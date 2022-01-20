<template>
  <div class="element-main">
    <el-button style="margin: 12px" size="small" type="plain" @click="back">返回登录</el-button>
    <div style="width: 90%;margin: 20px auto">
      <h3>忘记密码</h3>
      <el-row style="width: 80%">
        <el-steps :active="active" finish-status="success">
          <el-step title="第1步" />
          <el-step title="第2步" />
          <el-step title="已完成" />
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
