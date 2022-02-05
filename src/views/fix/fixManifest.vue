<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      维修工单
    </div>
    <div class="head-select-btn mw1200">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="全部部门">
            <el-option key="1" label="行政部" value="1" />
            <el-option key="2" label="安保部" value="2" />
            <el-option key="3" label="管理部" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formInline.name" placeholder="全部状态">
            <el-option key="1" label="进行维修" value="1" />
            <el-option key="2" label="已完成" value="2" />
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
            placeholder="搜索报修单号"
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
    <my-table class="mw1200" :tb="tb" @choose="tbSelect" @editRow="editRow" />
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
    label: '报修单号',
    key: 'a1'
  },
  {
    type: 0,
    label: '报修部门',
    key: 'a2',
    showOverflow: true
  },
  {
    type: 0,
    label: '报修人',
    key: 'a3'
  },
  {
    type: 0,
    label: '报修主题',
    key: 'a4'
  },
  {
    type: 0,
    label: '报修类型',
    key: 'a5'
  },
  {
    type: 0,
    label: '报修设备名称',
    key: 'a6'
  },
  {
    type: 0,
    label: '状态',
    key: 'a7'
  },
  {
    type: 0,
    label: '报修时间',
    key: 'a8'
  }
]
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
            name: '维修结果'
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
      this.tb.data = [
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '设备报修',
          a6: 'MI001',
          a7: '进行维修',
          a8: '2022-01-01 10:00'
        },
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '系统报修',
          a6: 'MI002',
          a7: '已修复',
          a8: '2022-01-01 10:00'
        },
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '设备报修',
          a6: 'MI003',
          a7: '待解决',
          a8: '2022-01-01 10:00'
        },
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '系统报修',
          a6: 'MI0014',
          a7: '未修复',
          a8: '2022-01-01 10:00'
        },
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '系统报修',
          a6: 'MI005',
          a7: '维修完成',
          a8: '2022-01-01 10:00'
        },
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '系统报修',
          a6: 'MI008',
          a7: '维修未完成',
          a8: '2022-01-01 10:00'
        }
      ]
      this.total = 6
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
      select.forEach((ele) => {
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
    }
  }
}
</script>
