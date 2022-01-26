<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材领用记录
    </div>
    <div class="head-select-btn mw1100">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-form-item label="" prop="a5">
            <el-date-picker
              v-model="formInline.a5"
              type="datetime"
              placeholder="选择申请时间"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="">
          <el-form-item label="" prop="a3">
            <el-date-picker
              v-model="formInline.a5"
              type="datetime"
              placeholder="选择领用时间"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="请选择耗材类型">
            <el-option key="1" label="一级分类" value="1" />
            <el-option key="2" label="二级分类" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="formInline.user"
            prefix-icon="el-icon-search"
            placeholder="搜索申请单号"
          />
        </el-form-item>

        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <my-table class="mw1100" :tb="tb" @choose="tbSelect" @editRow="editRow" />
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
    label: '申请单号',
    key: 'a1'
  },
  {
    type: 0,
    label: '出库单号',
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
    label: '数量',
    key: 'a7'
  }, {
    type: 0,
    label: '申请时间',
    key: 'a8'
  }, {
    type: 0,
    label: '领用时间',
    key: 'a9'
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
        height: null
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
        a1: '12345678',
        a2: 'W12345678',
        a3: '1234567890123',
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01 10:00',
        a9: '2022-01-01 10:00'
      }, {
        a1: '12345678',
        a2: 'W12345678',
        a3: '1234567890123',
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01 10:00',
        a9: '2022-01-01 10:00'
      }, {
        a1: '12345678',
        a2: 'W12345678',
        a3: '1234567890123',
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01 10:00',
        a9: '2022-01-01 10:00'
      }, {
        a1: '12345678',
        a2: 'W12345678',
        a3: '1234567890123',
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01 10:00',
        a9: '2022-01-01 10:00'
      }]
      this.total = 4
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
        this.$router.push({ name: 'protectDetail' })
      }
      if (btn.key === '2') {
        this.$router.push({ name: 'protectScore' })
      }
    },
    addIt() {
      this.$router.push({
        name: 'addProtect', params: {
          type: 'add'
        }
      })
    },
    deleteIt() {
      this.$alert('确定要删除吗？', '确认提示', {
        confirmButtonText: '确定'
      }).then(() => {
        this.$message.success('操作成功')
      })
    }
  }
}
</script>
