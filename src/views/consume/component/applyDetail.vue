<template>
  <div class="main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材申请 - 申请单详情
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
        <el-table-column prop="a5" label="申请数量" />
        <el-table-column prop="a6" label="当前库存" />
        <el-table-column prop="a7" label="供应商" />
        <el-table-column prop="a8" label="采购单价" />
        <el-table-column prop="a9" label="小计" />
      </el-table>

      <div style="padding-top: 35px">
        <el-button @click="back">返回</el-button>
        <el-button type="primary" @click="back">确认申请</el-button>
        <el-button type="danger" @click="back">上级审核</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          prop: 'date',
          label: '申请单号'
        },
        {
          prop: 'name',
          label: '申请部门'
        },
        {
          prop: 'address',
          label: '使用时间'
        },
        {
          prop: 'people',
          label: '审核人'
        }
      ],
      tableData2: [{
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '10',
        a7: '米宝供应商',
        a8: '10.00',
        a9: '100.00',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: '',
      selected: [],
      tabItem: [{
        name: '申请单号',
        value: '12345678'
      }, {
        name: '出库单号',
        value: ''
      }, {
        name: '状态',
        value: '确认中'
      }, {
        name: '申请部门',
        value: '行政部'
      }, {
        name: '申请人',
        value: '米小宝'
      }, {
        name: '申请时间',
        value: '2022-01-01 10:00:00'
      }, {
        name: '使用时间',
        value: '2020-01-01'
      }, {
        name: '申请理由',
        value: '已用完，需申请'
      }, {
        name: '审核人',
        value: ''
      }, {
        name: '审核时间',
        value: ''
      }, {
        name: '审核建议',
        value: ''
      }, {
        name: '出库人',
        value: ''
      }, {
        name: '出库时间',
        value: ''
      }, {
        name: '签收人',
        value: ''
      }, {
        name: '签收时间',
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
.el-steps--horizontal {
  padding: 50px 0;
}
</style>
