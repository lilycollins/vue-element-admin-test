<template>
  <div class="element-main">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材申请审核 - 审核详情
      </div>
      <el-row>
        <el-col :span="8">
          <el-table
            style="width: 100%"
            fit
            highlight-current-row
            :data="getValues"
            :show-header="false"
          >
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table style="width: 100%" :data="getValues" :show-header="false">
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table style="width: 100%" :data="getValues" :show-header="false">
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
      </el-row>

      <el-table :data="tableData2" border style="width: 100%; margin-top: 35px">
        <el-table-column label="耗材图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img" style="width: 100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="耗材编号" />
        <el-table-column prop="address" label="耗材名称" />
        <el-table-column prop="address" label="耗材类型" />
        <el-table-column prop="address" label="单位" />
        <el-table-column prop="address" label="申请数量" />
        <el-table-column prop="address" label="当前库存" />
        <el-table-column prop="address" label="供应商" />
        <el-table-column prop="address" label="预计采购单价" />
        <el-table-column prop="address" label="小计" />
      </el-table>
      <div style="padding-top: 35px">
        <p>审核建议</p>
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          people: ''
        }
      ],
      tableData2: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '1518 弄',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: ''
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
</style>
