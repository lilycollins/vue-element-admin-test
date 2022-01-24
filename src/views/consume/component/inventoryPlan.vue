<template>
  <div class="element-main">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材盘点 - 创建盘点计划
      </div>
      <div>
        <p>盘点单号</p>
        <el-input
          v-model="inventoryNo"
          style="width: 350px"
          placeholder="请输入盘点单号"
        />
        <p>执行时间</p>
        <el-date-picker
          v-model="time"
          style="width: 350px"
          type="datetime"
          placeholder="选择执行时间"
        />
        <p>备注</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 14 }"
          placeholder="请输入备注"
        />
      </div>
      <div style="padding-top: 35px">
        <el-button @click="back">取消</el-button>
        <el-button type="primary" @click="back">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inventoryNo: '',
      time: '',
      textarea: ''
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.m50 {
  margin: 50px;
}
</style>
