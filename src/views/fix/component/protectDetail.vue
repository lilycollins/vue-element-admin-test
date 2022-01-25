<template>
  <div class="element-main main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        保修详情
      </div>
      <h4>基本信息</h4>
      <div class="like-table-item">
        <div v-for="item in tabItem" :key="item.name" class="table-item">
          <div class="table-item-lable">{{ item.name }}</div> <span class="table-item-value">{{ item.value }}</span>
        </div>
      </div>
      <div style="padding-top: 35px">
        <p>保修情况描述</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          readonly
          :autosize="{ minRows: 10, maxRows: 14 }"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <p>附件上传</p>
        <img
          src="../../../assets/img/default.svg"
          style="width: 200px; padding: 12px"
          alt=""
        >
        <img
          src="../../../assets/img/default.svg"
          style="width: 200px; padding: 12px"
          alt=""
        >
      </div>
      <h4>保修情况</h4>
      <div class="like-table-item">
        <div v-for="item in tabItem2" :key="item.name" class="table-item">
          <div class="table-item-lable">{{ item.name }}</div> <span class="table-item-value">{{ item.value }}</span>
        </div>
      </div>
      <div style="padding-top: 35px">
        <p>维修情况描述</p>
        <el-input
          v-model="textarea2"
          style="width: 80%"
          type="textarea"
          readonly
          :autosize="{ minRows: 10, maxRows: 14 }"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <p>附件上传</p>
        <img
          src="../../../assets/img/default.svg"
          style="width: 200px; padding: 12px"
          alt=""
        >
        <img
          src="../../../assets/img/default.svg"
          style="width: 200px; padding: 12px"
          alt=""
        >
      </div>

      <h4>维修点评</h4>
      <div class="fix-div">
        <p style="padding-right: 100px">保修完成度</p>
        <p>{{ a1 }}</p>
      </div>
      <div class="fix-div">
        <p>评分</p>
        <el-rate v-model="score" style="line-height: 60px" />
      </div>
      <div>
        <p>点评描述</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          readonly
          :autosize="{ minRows: 10, maxRows: 14 }"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <el-button @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabItem2: [{
        name: '接单部门',
        value: '综合部'
      }, {
        name: '接单人',
        value: '维修人1'
      }, {
        name: '联系电话',
        value: '13800138000'
      }, {
        name: '维修结果',
        value: '已修复'
      }, {
        name: '接单时间',
        value: '2022-01-01 10:00'
      }, {
        name: '维修时间',
        value: '2022-01-01 10:00'
      }],
      tabItem: [{
        name: '维修单号',
        value: '123456789'
      }, {
        name: '申请时间',
        value: '2022-01-01 10:00:00'
      }, {
        name: '接单时间',
        value: '2022-01-01 10:00:00'
      }, {
        name: '保修主题',
        value: '质量保修'
      }, {
        name: '保修类型',
        value: '设备保修'
      }, {
        name: '保修设备名称',
        value: 'MI001'
      }],
      textarea: '暂无',
      textarea2: '已完成',
      a1: '维修完成',
      score: 5,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
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
.fix-div {
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
