<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      供应商管理
    </div>
    <div class="head-select-btn mw700">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="formInline.user"
            prefix-icon="el-icon-search"
            placeholder="搜索供应商编号/名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
        <el-button type="primary" @click="addIt">创建</el-button>
        <el-button
          type="danger"
          :disabled="selected.length == 0"
          @click="deleteIt"
        >删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <my-table class="mw700" :tb="tb" @choose="tbSelect" @editRow="editRow" />
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
    id: 2,
    type: 0,
    label: '供应商编号',
    key: 'a1'
  },
  {
    id: 3,
    type: 0,
    label: '供应商名称',
    key: 'a2',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '状态',
    key: 'a3'
  }, {
    id: 5,
    type: 0,
    label: '创建日期',
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
        height: null,
        operationName: '操作',
        operationWidth: '180',
        OperationBtn: [
          {
            type: 'text',
            key: '1',
            name: '编辑'
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
        'a1': '0001',
        'a2': '自采供应商',
        'a3': '启用',
        'a4': '2021-01-02  12:12'
      }, {
        'a1': '0002',
        'a2': '米宝供应商',
        'a3': '启用',
        'a4': '2021-01-02  12:12'
      }, {
        'a1': '0001',
        'a2': '小宝供应商',
        'a3': '禁用',
        'a4': '2021-01-02  12:12'
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
      this.$router.push({
        name: 'supplyChange', params: {
          type: 'edit'
        }
      })
    },
    addIt() {
      this.$router.push({
        name: 'supplyChange', params: {
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
