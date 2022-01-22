<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材领用记录
    </div>
    <div style="display: flex; justify-content: space-between">
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
            <el-option key="1" label="巡检" value="1" />
            <el-option key="2" label="维保" value="2" />
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
    </div>
    <div class="tag-warp">
      <el-button plain>刷新</el-button>
    </div>

    <!-- 表格 -->
    <my-table :tb="tb" @choose="tbSelect" @editRow="editRow" />
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
    key: 'a2'
  },
  {
    type: 0,
    label: '出库单号',
    key: 'a3',
    showOverflow: true
  },
  {
    type: 0,
    label: '耗材编号',
    key: 'a4'
  }, {
    type: 0,
    label: '耗材名称',
    key: 'a4'
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
        'a1': '主任',
        'a2': '办公室主任',
        'a3': '启用',
        'a4': '2021-01-02  12:12'
      }, {
        'a1': '职员',
        'a2': '办公室主任',
        'a3': '禁用',
        'a4': '2021-01-02  12:12'
      }]
      this.total = 2
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
