<template>
  <div class="element-main main-content">
    <el-button style="margin: 12px" size="small" type="plain" @click="back">返回</el-button>
    <div style="width: 90%;margin: 20px auto">
      <div class="sub-title-head"> <div class="l-box" />耗材申请审核  - 审核</div>
      <div class="like-table-item">
        <div class="table-item">
          申请单号 <span>{{ form.a1 }}</span>
        </div>
        <div class="table-item">
          状态    <span>{{ form.a2 }}</span>
        </div>
        <div class="table-item">
          申请部门 <span>{{ form.a3 }}</span>
        </div>
        <div class="table-item">
          申请人 <span>{{ form.a4 }}</span>
        </div>
        <div class="table-item">
          申请时间 <span>{{ form.a5 }}</span>
        </div>
        <div class="table-item">
          使用时间 <span>{{ form.a6 }}</span>
        </div>
        <div class="table-item">
          申请理由 <span>{{ form.a7 }}</span>
        </div>
        <div class="table-item">
          审核人 <span>{{ form.a8 }}</span>
        </div>
        <div class="table-item">
          审核时间 <span>{{ form.a9 }}</span>
        </div>
      </div>
      <el-table
        :data="tableData2"
        border
        style="width: 100%;margin-top: 35px"
      >
        <el-table-column
          label="耗材图片"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img" style="width: 100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="a1"
          label="耗材编号"
        />
        <el-table-column
          prop="a2"
          label="耗材名称"
        />
        <el-table-column
          prop="a3"
          label="耗材类型"
        />
        <el-table-column
          prop="a4"
          label="单位"
        />
        <el-table-column
          prop="a5"
          label="申请数量"
        />
        <el-table-column
          prop="a6"
          label="当前库存"
        />
        <el-table-column
          prop="a7"
          label="供应商"
        />
        <el-table-column
          prop="a8"
          label="预计采购单价"
        />
        <el-table-column
          prop="a9"
          label="小计"
        />
      </el-table>
      <div style="padding-top: 35px">
        <p>审核建议</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <el-button @click="back">取消</el-button>
        <el-button type="primary" @click="back">审核通过</el-button>
        <el-button type="danger" @click="back">审核不通过</el-button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        a1: '123456',
        a2: '审核中',
        a3: '行政部',
        a4: '米小宝',
        a5: '2022-01-01 10:00:00',
        a6: '2020-05-06',
        a7: '已用完，需申请',
        a8: '',
        a9: '',
        a10: ''
      },
      tableData2: [{
        a1: '123456795452',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10',
        a6: '0',
        a7: '米宝供应商',
        a8: '10.00',
        a9: '100.00',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: ''
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
