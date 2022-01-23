<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材盘点
    </div>
    <div style="display: flex; justify-content: space-between">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="全部状态">
            <el-option key="1" label="巡检" value="1" />
            <el-option key="2" label="维保" value="2" />
          </el-select>
        </el-form-item>
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
            placeholder="搜索盘点单号"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tag-warp">
      <el-button plain>刷新</el-button>
      <el-button type="primary" @click="addIt">创建计划单</el-button>
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
    id: 2,
    type: 0,
    label: '盘点单号',
    key: 'a2'
  },
  {
    id: 3,
    type: 0,
    label: '计划执行时间',
    key: 'a3',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '发起人',
    key: 'a4'
  }, {
    type: 0,
    label: '状态',
    key: 'a4'
  }, {
    type: 0,
    label: '盘点耗材款数',
    key: 'a4'
  }, {
    type: 0,
    label: '盘点数量',
    key: 'a4'
  }, {
    type: 0,
    label: '差异数量',
    key: 'a4'
  }, {
    type: 0,
    label: '发起时间',
    key: 'a4'
  }, {
    type: 0,
    label: '盘点时间',
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
            name: '详情'
          },
          {
            type: 'text',
            key: '2',
            name: '开始盘点'
          },
          {
            type: 'text',
            key: '2',
            name: '终止'
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
      if (btn.key === '3') {
        this.$alert('确定要终止吗？', '确认提示', {
          confirmButtonText: '确定'
        }).then(() => {
          this.$message.success('操作成功')
        })
      }
    },
    addIt() {
      this.$router.push({
        name: 'addProtect', params: {
          type: 'add'
        }
      })
    }
  }
}
</script>
