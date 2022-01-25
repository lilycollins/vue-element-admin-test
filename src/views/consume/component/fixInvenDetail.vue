<template>
  <div class="main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材盘点修正 - 修正单详情
      </div>
      <div class="like-table-item">
        <div v-for="item in tabItem" :key="item.name" class="table-item">
          <div class="table-item-lable">{{ item.name }}</div> <span class="table-item-value">{{ item.value }}</span>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData2"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" width="55" />
        <el-table-column label="耗材图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img" style="width: 100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="a1" label="耗材编号" />
        <el-table-column prop="a2" label="耗材名称" />
        <el-table-column prop="a3" label="耗材类型" />
        <el-table-column prop="a4" label="单位" />
        <el-table-column prop="a5" label="上次盘点数量" />
        <el-table-column prop="a6" label="修正数量" />
      </el-table>

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
      tableData2: [{
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '10',
        a7: '0',
        img: require('../../../assets/img/default.svg')
      }, {
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '15',
        a7: '0',
        img: require('../../../assets/img/default.svg')
      }, {
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '10',
        a7: '+5',
        img: require('../../../assets/img/default.svg')
      }, {
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '10',
        a7: '-5',
        img: require('../../../assets/img/default.svg')
      },
      {
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '10',
        a7: '0',
        img: require('../../../assets/img/default.svg')
      }, {
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '10',
        a7: '0',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: '',
      selected: [],
      tabItem: [{
        name: '修正单号',
        value: 'P12345678'
      }, {
        name: '修正人',
        value: '库管1'
      }, {
        name: '创建时间',
        value: '2022-01-01 10:00:00'
      }, {
        name: '修正耗材款数',
        value: '100'
      }, {
        name: '修正数量',
        value: '10000'
      }, {
        name: '备注',
        value: ''
      }]
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
