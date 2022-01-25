<template>
  <div class="main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材申请 - 出库单详情
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
        style="width: 100%; margin: 55px 0"
      >
        <el-table-column type="index" width="55" />
        <el-table-column prop="a1" label="申请单号" />
        <el-table-column prop="a2" label="申请部门" />
        <el-table-column prop="a3" label="申请人" />
        <el-table-column label="耗材图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img" style="width: 100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="a4" label="耗材编号" />
        <el-table-column prop="a5" label="耗材名称" />
        <el-table-column prop="a6" label="耗材类型" />
        <el-table-column prop="a7" label="单位" />
        <el-table-column prop="a8" label="出库数量" />
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
        a1: 'P12345678',
        a2: '行政部',
        a3: '米小宝',
        a4: '1234567890123',
        a5: '得力A4 70g打印纸',
        a6: '办公用品',
        a7: '包',
        a8: '10',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: '',
      selected: [],
      tabItem: [{
        name: '出库单号',
        value: 'P12345678'
      }, {
        name: '入库人',
        value: '库管1'
      }, {
        name: '入库时间',
        value: '2022-01-01 10:00:00'
      }, {
        name: '备注',
        value: ''
      }]
    }
  },
  computed: {
    getHeaders() {
      return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
    },
    getValues() {
      return this.headers.map(item => {
        return this.tableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { 'title': item.label })
      })
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
.el-steps--horizontal {
  padding: 50px 0;
}
</style>
