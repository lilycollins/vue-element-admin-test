<template>
  <div class="main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材盘点 - 盘点单详情
      </div>
      <div class="like-table-item">
        <div class="table-item">
          盘点单号 <span>{{ form.a1 }}</span>
        </div>
        <div class="table-item">
          发起人 <span>{{ form.a2 }}</span>
        </div>
        <div class="table-item">
          发起时间 <span>{{ form.a3 }}</span>
        </div>
        <div class="table-item">
          执行时间 <span>{{ form.a4 }}</span>
        </div>
        <div class="table-item">
          盘点人 <span>{{ form.a5 }}</span>
        </div>
        <div class="table-item">
          盘点时间 <span>{{ form.a6 }}</span>
        </div>
        <div class="table-item">
          耗材款数 <span>{{ form.a7 }}</span>
        </div>
        <div class="table-item">
          盘点数量 <span>{{ form.a8 }}</span>
        </div>
        <div class="table-item">
          盘点差异 <span>{{ form.a9 }}</span>
        </div>
        <div class="table-item" style="margin-bottom: 35px">
          备注 <span>{{ form.a10 }}</span>
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
        <el-table-column prop="a5" label="库存数量" />
        <el-table-column prop="a6" label="盘点数量" />
        <el-table-column prop="a7" label="盘点差异" />
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
      form: {
        a1: 'P12345678',
        a2: '库管1',
        a3: '2022-01-01 10:00:00',
        a4: '2022-01-01 10:00:00',
        a5: '库管1',
        a6: '2022-01-01 10:00:00',
        a7: '100',
        a8: '10000',
        a9: '0',
        a10: ''
      }
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
