<template>
  <div class="element-main main-content">
    <div style="width: 90%;margin: 20px auto">
      <div class="sub-title-head"> <div class="l-box" />维修点评</div>
      <h4>基本信息</h4>
      <div class="like-table-item">
        <div v-for="item in tabItem" :key="item.name" class="table-item">
          <div class="table-item-lable">{{ item.name }}</div> <span class="table-item-value">{{ item.value }}</span>
        </div>
      </div>
      <div style="padding-top: 35px">
        <p>报修情况描述</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          readonly
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <p>附件上传</p>
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
      </div>
      <h4>报修情况</h4>
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
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <p>附件上传</p>
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
      </div>

      <h4>维修点评</h4>
      <div class="fix-div">
        <p style="padding-right: 100px"><span style="color: red">*</span>报修完成度</p>
        <el-radio-group v-model="radio" style="line-height: 60px">
          <el-radio :label="3">维修完成</el-radio>
          <el-radio :label="6">维修未完成</el-radio>
        </el-radio-group>
      </div>
      <div class="fix-div">
        <p><span style="color: red">*</span>维修评价</p>
        <el-rate v-model="score" style="line-height: 60px" />
      </div>
      <div>
        <p>点评描述</p>
        <el-input
          v-model="comment"
          style="width: 80%"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <el-button @click="back">返回</el-button>
        <el-button type="primary" @click="back">提交</el-button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: '暂无',
      textarea2: '已完成',
      comment: '',
      a1: '维修完成',
      score: 0,
      radio: null,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
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
        name: '报修主题',
        value: '质量报修'
      }, {
        name: '报修类型',
        value: '设备报修'
      }, {
        name: '报修设备名称',
        value: 'MI001'
      }],
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
      form: {
        a1: '123456789',
        a2: '2022-01-01 10:00',
        a3: '2022-01-01 10:00',
        a4: '质量报修',
        a5: '设备报修',
        a6: 'MI001',
        a7: '综合部',
        a8: '维修人1',
        a9: '13800138000',
        a10: '已修复',
        a11: '2022-01-01 10:00',
        a12: '2022-01-01 10:00'
      }
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
    width: 400px;
    display: flex;
    justify-content: space-between;
}
</style>
