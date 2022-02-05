<template>
  <div class="app-container">
    <div class="common-title">
      <p>代办事宜</p>
      <el-divider />
    </div>
    <div class="top-header">
      <div v-for="(item, index) in agencyData" :key="index">
        <div style="display: flex;cursor: pointer" @click="todoData">
          <img :src="item.src" alt="">
          <h4>{{ item.title }}</h4>
        </div>
        <div class="bottom">
          <p>{{ item.desc }}</p>
          <p>{{ item.time }}</p>
        </div>
        <el-divider />
      </div>
    </div>
    <div class="common-title" style="padding-top: 30px">
      <p>信息发布</p>
      <el-divider />
    </div>
    <div class="top-header">
      <div v-for="(item, index) in messageData" :key="index" style="position:relative">
        <img :src="item.src" alt="" style="width: 120px; height: 60px;margin: 20px 12px 20px 0">
        <div style="display: flex; padding-left: 140px;position: absolute; top: 0;justify-content: space-between; width: 100%;">
          <div>
            <h4 style="cursor: pointer" @click="toDetail">{{ item.title }}</h4>
            <p style="color: #999;font-size: 14px">{{ item.desc }}</p>
          </div>
          <div style="font-size: 12px; position: absolute; top: 28px; right: 10px">
            <p>{{ item.time }}</p>
            <p>发布人:{{ item.publisher }}</p>
          </div>
        </div>

        <el-divider />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      driver: null,
      agencyData: [
        {
          title: '耗材审核事宜',
          desc: '【库管1】向您发起 1 张【耗材申请单】，请及时处理！',
          time: '2022-01-20 12:00:00',
          src: require('../../assets/img/u119.svg')
        },
        {
          title: '耗材确认事宜',
          desc: '【米小宝】向您发起 1 张【耗材申请单】，请及时处理！',
          time: '2022-01-20 12:00:00',
          src: require('../../assets/img/u119.svg')
        },
        {
          title: '耗材发放确认事宜',
          desc: '您申请的【单号：W12345678，耗材物品】已发放，请及时签收！',
          time: '2022-01-20 12:00:00',
          src: require('../../assets/img/u119.svg')
        },
        {
          title: '报修确认事宜',
          desc: '【米小宝】向您发起 1 张【报修申请单】，请及时处理！',
          time: '2022-01-20 12:00:00',
          src: require('../../assets/img/u119.svg')
        },
        {
          title: '报修结果确认事宜',
          desc: '您申请的【单号：A12345678，报修申请】已出结果，请及时处理！',
          time: '2022-01-20 12:00:00',
          src: require('../../assets/img/u119.svg')
        }
      ],
      messageData: [
        {
          title: '消防安全知识进校园！台江区开展全国消防安全宣传教育日系列活动',
          desc: '全国消防安全检查',
          time: '2022-01-20 12:00:00',
          publisher: '系统管理员',
          src: require('../../assets/img/default.svg')
        },
        {
          title: '消防安全知识进校园！台江区开展全国消防安全宣传教育日系列活动',
          desc: '全国消防安全检查',
          time: '2022-01-20 12:00:00',
          publisher: '系统管理员',
          src: require('../../assets/img/default.svg')
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'message' })
    },
    todoData() {
      this.$router.push({ name: 'todo' })
    }
  }
}
</script>
<style lang="scss" scoped>
.common-title {
  padding: 0 12px 0 12px;
  p{
    color: #1472FF;
    font-size: 20px;
    font-weight: bold
  }
}
.top-header {
  width: 98%;
  min-height: 200px;
  max-height: 700px;
  border: 1px solid #adadad;
  border-radius: 10px;
  margin: 12px auto;
  overflow-y: auto;
  padding: 0 24px 0 24px;
  .bottom {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-left: 24px;
  }
  img {
    width: 12px;
    height: 12px;
    margin: 24px 24px 0 0;
  }
  .el-divider--horizontal {
    margin: 0;
  }
}
</style>
