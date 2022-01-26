<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材入库
    </div>
    <div class="head-select-btn mw1000">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-date-picker
            v-model="formInline.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="formInline.user"
            prefix-icon="el-icon-search"
            placeholder="搜索耗材编号/名称或入库单号"
          />
        </el-form-item>

        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
        <el-button type="primary" @click="addIt">创建入库单</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <my-table class="mw1000" :tb="tb" @choose="tbSelect" @editRow="editRow" />
    <!-- 分页 -->
    <pagination
      v-show="total >= 0"
      :total="total"
      :page.sync="form.pageIndex"
      :limit.sync="form.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import myTable from '@/components/Table'
import pagination from '@/components/Pagination'
const field = [
  {
    type: 0,
    label: '入库单号',
    key: 'a1'
  },
  {
    type: 7,
    label: '耗材图片',
    key: 'a2',
    showOverflow: true
  },
  {
    type: 0,
    label: '耗材编号',
    key: 'a3'
  }, {
    type: 0,
    label: '耗材名称',
    key: 'a4'
  }, {
    type: 0,
    label: '耗材类型',
    key: 'a5'
  }, {
    type: 0,
    label: '单位',
    key: 'a6'
  }, {
    type: 0,
    label: '供应商',
    key: 'a7'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a8'
  }, {
    type: 0,
    label: '金额',
    key: 'a9'
  }, {
    type: 0,
    label: '入库人',
    key: 'a10'
  }, {
    type: 0,
    label: '入库时间',
    key: 'a11'
  }]
export default {
  components: {
    myTable,
    pagination
  },
  data() {
    return {
      form: {
        pageIndex: 1,
        pageSize: 20
      },
      formInline: {
        user: '',
        time: ''
      },
      tabPosition: 'check',
      tb: {
        fields: field,
        data: [],
        index: true,
        selectionBtn: true,
        height: null,
        operationName: '操作',
        operationWidth: '180',
        OperationBtn: [
          {
            type: 'text',
            key: '1',
            name: '详情'
          }
        ]
      },
      total: 0,
      selected: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.tb.height = document.body.clientHeight - 240
  },
  methods: {
    getList() {
      this.tb.data = [{
        a1: 'P12345678',
        a2: require('../../assets/img/default.svg'),
        a3: '1234567890123',
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '米宝供应商',
        a8: '100',
        a9: '1000000.00',
        a10: '库管1',
        a11: '2022-01-01 10:00'
      }, {
        a1: 'P12345678',
        a2: require('../../assets/img/default.svg'),
        a3: '1234567890123',
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '米宝供应商',
        a8: '100',
        a9: '1000000.00',
        a10: '库管1',
        a11: '2022-01-01 10:00'
      }, {
        a1: 'P12345678',
        a2: require('../../assets/img/default.svg'),
        a3: '1234567890123',
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '米宝供应商',
        a8: '100',
        a9: '1000000.00',
        a10: '库管1',
        a11: '2022-01-01 10:00'
      }]
      this.total = 3
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val
      this.getList()
    },
    onSubmit() {
      this.form.pageIndex = 1
      this.getList()
    },
    tbSelect(select) {
      this.selected = []
      select.forEach(ele => {
        this.selected.push(ele.id)
      })
    },
    editRow({ row }, btn, index) {
      if (btn.key === '1') {
        this.$router.push({ name: 'instoreDetail' })
      }
    },
    addIt() {
      this.$router.push({
        name: 'instoreChange'
      })
    }
  }
}
</script>
