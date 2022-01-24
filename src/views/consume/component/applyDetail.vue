<template>
  <div class="main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材申请 - 申请单详情
      </div>
      <div class="like-table-item">
        <div class="table-item">
          申请单号 <span>{{ form.a1 }}</span>
        </div>
        <div class="table-item">
          出库单号 <span>{{ form.a2 }}</span>
        </div>
        <div class="table-item">
          状态 <span>{{ form.a3 }}</span>
        </div>
        <div class="table-item">
          申请部门 <span>{{ form.a4 }}</span>
        </div>
        <div class="table-item">
          申请人 <span>{{ form.a5 }}</span>
        </div>
        <div class="table-item">
          申请时间<span>{{ form.a6 }}</span>
        </div>
        <div class="table-item">
          使用时间<span>{{ form.a7 }}</span>
        </div>
        <div class="table-item">
          申请理由<span>{{ form.a8 }}</span>
        </div>
        <div class="table-item">
          审核人<span>{{ form.a9 }}</span>
        </div>
        <div class="table-item">
          审核时间<span>{{ form.a10 }}</span>
        </div>
        <div class="table-item">
          审核建议<span>{{ form.a11 }}</span>
        </div>
        <div class="table-item">
          出库人<span>{{ form.a12 }}</span>
        </div>
        <div class="table-item">
          出库时间<span>{{ form.a13 }}</span>
        </div>
        <div class="table-item">
          签收人<span>{{ form.a14 }}</span>
        </div>
        <div class="table-item">
          签收时间<span>{{ form.a15 }}</span>
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
      form: {
        a1: '12345678',
        a2: '',
        a3: '确认中',
        a4: '行政部',
        a5: '米小宝',
        a6: '2022-01-01 10:00:00',
        a7: '2020-01-01',
        a8: '已用完，需申请',
        a9: '',
        a10: '',
        a11: '',
        a12: '',
        a13: '',
        a14: '',
        a15: ''
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
