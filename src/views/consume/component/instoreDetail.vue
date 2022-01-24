<template>
  <div class="main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材申请 - 入库单详情
      </div>
      <div class="like-table-item">
        <div class="table-item">
          入库单号 <span>{{ form.a1 }}</span>
        </div>
        <div class="table-item">
          入库人 <span>{{ form.a2 }}</span>
        </div>
        <div class="table-item">
          入库时间 <span>{{ form.a3 }}</span>
        </div>
        <div class="table-item">
          供应商 <span>{{ form.a4 }}</span>
        </div>
        <div class="table-item">
          备注 <span>{{ form.a5 }}</span>
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
        <el-table-column prop="a5" label="入库单价" />
        <el-table-column prop="a6" label="入库数量" />
        <el-table-column prop="a7" label="小计" />
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
        a5: '10.00',
        a6: '10',
        a7: '500.00',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: '',
      selected: [],
      form: {
        a1: 'P12345678',
        a2: '库管1',
        a3: '2022-01-01 10:00:00',
        a4: '米宝供应商',
        a5: '已用完，需申请'
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
.el-steps--horizontal {
  padding: 50px 0;
}
</style>
